import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const vfs = (pdfFonts as any).pdfMake
  ? (pdfFonts as any).pdfMake.vfs
  : (pdfFonts as any).vfs;

(pdfMake as any).vfs = vfs;

@Injectable({
  providedIn: 'root',
})
export class ResitService {

  private colors = {
    primary: '#1E3A8A',
    accent: '#3B82F6',
    text: '#1F2937',
    lightGray: '#F3F4F6',
    white: '#FFFFFF',
    border: '#E5E7EB'
  };

  async generateReceipt(item: any, receiptInfo?: any) {
    const logo = await this.getBase64ImageFromURL('assets/logo-default.png');

    const totalAmount = item.detailsBayaran.reduce(
      (acc: number, curr: any) => acc + (curr.jumlah || 0),
      0
    );

    const receiptRows = item.detailsBayaran.map((detail: any, index: number) => [
      { text: (index + 1).toString(), style: 'tableCell', alignment: 'center' },
      { text: (detail.butiran || 'Yuran Sekolah').toUpperCase(), style: 'tableCell' },
      { text: `RM ${detail.jumlah?.toFixed(2) || '0.00'}`, alignment: 'right', style: 'tableCell' }
    ]);

    const documentDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      // watermark: { text: 'RASMI', color: 'blue', opacity: 0.05, bold: true, italics: false },
      header: () => this.getHeaderPage(item, receiptInfo),
      footer: () => this.getFooterPage(),

      content: [
        this.getHeaderSection(item, logo),
        { text: '\n' },
        this.getStudentDetails(item),
        { text: '\n' },
        this.getTableSection(receiptRows, totalAmount),
        { text: '\n' },
        this.getSummarySection(totalAmount),
        this.getFooterSection(item)
      ],
      styles: this.getPdfStyles(),
      defaultStyle: {
        font: 'Roboto',
        fontSize: 10,
        color: this.colors.text
      }
    };

    const pdf = pdfMake.createPdf(documentDefinition);

    pdf.open();

    pdf.download(`${item?.namaPelajar}-Resit.pdf`)
  }

  private getHeaderPage(item: any, receipt?: any) {
    return {
      margin: [40, 20, 40, 0],
      columns: [
        {
          text: [
            { text: 'NO. RESIT: ', fontSize: 8, color: '#9CA3AF', bold: true },
            {
              text: item.id ?
                // `RES-${item.id.substring(0, 8).toUpperCase()}`
                receipt.receipt_no
                : 'N/A',
              fontSize: 8,
              bold: true,
              color: '#1E3A8A'
            }
          ],
          alignment: 'right'
        }
      ]
    }
  }

  private getHeaderSection(item: any, logo: any) {
    return {
      stack: [
        {
          table: {
            widths: [60, '*', 150],
            body: [[
              {
                image: logo,
                fit: [65, 65],
                alignment: 'left',
                border: [false, false, false, false]
              },
              {
                stack: [
                  { text: '{{NAMA SEKOLAH}}', style: 'companyName' },
                  { text: '{{ALAMAT SEKOLAH}}', style: 'companyAddress' },
                  { text: 'Tel: {{NO. TELEFON SEKOLAH}}  |  Email: {{EMAIL SEKOLAH}}', style: 'companyAddress' }
                ],
                margin: [10, 5, 0, 0],
                alignment: 'left',
                valign: 'middle',
                border: [false, false, false, false]
              },
              {
                stack: [
                  { text: 'RESIT RASMI', style: 'receiptTitle', alignment: 'right' },
                  {
                    text: [
                      { text: 'TARIKH: ', bold: true, color: '#6B7280', fontSize: 9 },
                      { text: new Date().toLocaleDateString('en-GB'), bold: true, fontSize: 10 }
                    ],
                    alignment: 'right',
                    margin: [0, 2, 0, 0]
                  }
                ],
                margin: [10, 5, 0, 0],
                alignment: 'right',
                valign: 'middle',
                border: [false, false, false, false]
              }
            ]]
          },
          layout: 'noBorders'
        },
        {
          canvas: [
            { type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 2, lineColor: this.colors.primary }
          ],
          margin: [0, 10, 0, 10]
        }
      ]
    };
  }

  private getStudentDetails(item: any) {
    return {
      style: 'infoContainer',
      table: {
        widths: ['20%', 'auto', '35%', '20%', 'auto', '35%'],
        body: [
          [
            { text: 'NAMA', style: 'label' },
            { text: ':', style: 'label' },
            { text: (item.namaPelajar || '-').toUpperCase(), style: 'value' },
            { text: 'KELAS', style: 'label' },
            { text: ':', style: 'label' },
            { text: (item.kelas || '-').toUpperCase(), style: 'value' }
          ],
          [
            { text: 'TARIKH BAYARAN', style: 'label' },
            { text: ':', style: 'label' },
            { text: new Date(item.tarikhBayaran).toLocaleDateString('en-GB') || '-', style: 'value' },
            { text: 'KAEDAH BAYARAN', style: 'label' },
            { text: ':', style: 'label' },
            { text: (item.jenisBayaran || 'TUNAI').toUpperCase(), style: 'value' }
          ]
        ]
      },
      layout: {
        hLineWidth: () => 0,
        vLineWidth: () => 0,
        paddingTop: () => 5,
        paddingBottom: () => 5
      }
    };
  }

  private getTableSection(rows: any[], total: number) {
    return {
      table: {
        headerRows: 1,
        widths: [30, '*', 100],
        body: [
          [
            { text: 'NO', style: 'tableHeader', alignment: 'center' },
            { text: 'KETERANGAN BAYARAN', style: 'tableHeader' },
            { text: 'JUMLAH (RM)', style: 'tableHeader', alignment: 'right' }
          ],
          ...rows,
          [
            { text: '', border: [false, false, false, false] },
            { text: 'JUMLAH KESELURUHAN', style: 'totalLabel', alignment: 'right', border: [false, false, false, false] },
            { text: `RM ${total.toFixed(2)}`, style: 'totalValue', alignment: 'right', border: [false, false, false, false] }
          ]
        ]
      },
      layout: {
        fillColor: (rowIndex: number) => {
          if (rowIndex === 0) return this.colors.primary;
          if (rowIndex === rows.length + 1) return this.colors.lightGray;
          return rowIndex % 2 === 0 ? '#F9FAFB' : null;
        },
        hLineWidth: (i: number, node: any) =>
          i === 0 || i === 1 || i === node.table.body.length - 1 ? 0 : 1,
        vLineWidth: () => 0,
        hLineColor: '#E5E7EB',
        paddingTop: () => 4,
        paddingBottom: () => 4
      }
    };
  }

  private getSummarySection(totalAmount: number) {
    return {
      stack: [
        {
          text: `Ringgit Malaysia: ${this.numberToMalayWords(totalAmount)}`,
          style: 'amountWords',
          alignment: 'right'
        }
      ]
    };
  }

  private getFooterSection(item: any) {
    return {
      margin: [0, 40, 0, 0],
      stack: [
        {
          columns: [
            {
              stack: [
                { text: 'NOTA PENTING:', fontSize: 8, bold: true, color: this.colors.primary },
                { text: '1. Resit ini adalah cetakan komputer, tandatangan tidak diperlukan.', fontSize: 8, color: '#6B7280' },
                { text: '2. Sila simpan resit ini sebagai bukti pembayaran yang sah.', fontSize: 8, color: '#6B7280' },
                { text: '3. Sebarang pertanyaan sila hubungi pejabat sekolah.', fontSize: 8, color: '#6B7280' }
              ],
              width: '*'
            },
            {
              // Signature Line (Optional placeholder)
              stack: [
                { text: 'Disediakan Oleh:', fontSize: 8, color: '#6B7280', margin: [0, 0, 0, 10] },
                { text: 'T.T', fontSize: 8, color: '#6B7280', margin: [0, 0, 0, 5] },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.5, lineColor: '#9CA3AF' }] },
                { text: '{{JAWATAN PENGESAH}}', fontSize: 8, bold: true, margin: [0, 5, 0, 0] }
              ],
              width: '25%',
              alignment: 'center'
            }
          ]
        },
      ]
    };
  }

  private getFooterPage() {
    return {
      text: '© {{NAMA SEKOLAH}} - Dijana oleh Sistem myResit Sekolah',
      fontSize: 7,
      color: '#838383',
      alignment: 'center',
      margin: [0, 30, 0, 0]
    };
  }

  private getPdfStyles() {
    return {
      companyName: { fontSize: 16, bold: true, color: this.colors.primary, margin: [0, 0, 0, 2] },
      companyAddress: { fontSize: 9, color: '#4B5563' },
      receiptTitle: { fontSize: 16, bold: true, color: this.colors.primary },
      infoContainer: { margin: [0, 5, 0, 5] },
      label: { fontSize: 9, color: '#6B7280', bold: true },
      value: { fontSize: 10, color: '#111827', bold: true },
      tableHeader: { fontSize: 9, bold: true, color: 'white', margin: [0, 5, 0, 5] },
      tableCell: { fontSize: 10, color: '#374151', margin: [0, 5, 0, 5] },
      totalLabel: { fontSize: 10, bold: true, color: this.colors.primary, margin: [0, 10, 0, 10] },
      totalValue: { fontSize: 14, bold: true, color: this.colors.primary, margin: [0, 8, 0, 8] },
      amountWords: { fontSize: 9, italics: true, bold: true, color: '#4B5563', margin: [0, 5, 0, 0] }
    };
  }

  private getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise(resolve => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };

      img.onerror = () => {
        resolve('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
      };

      img.src = url;
    });
  }

  private numberToMalayWords(num: number): string {
    const a = ['', 'SATU ', 'DUA ', 'TIGA ', 'EMPAT ', 'LIMA ', 'ENAM ', 'TUJUH ', 'LAPAN ', 'SEMBILAN ', 'SEPULUH ', 'SEBELAS '];

    const terbilang = (n: number): string => {
      if (n < 12) return a[n];
      if (n < 20) return a[n - 10] + 'BELAS ';
      if (n < 100) return a[Math.floor(n / 10)] + 'PULUH ' + terbilang(n % 10);
      if (n < 200) return 'SERATUS ' + terbilang(n - 100);
      if (n < 1000) return a[Math.floor(n / 100)] + 'RATUS ' + terbilang(n % 100);
      if (n < 2000) return 'SERIBU ' + terbilang(n - 1000);
      if (n < 1000000) return terbilang(Math.floor(n / 1000)) + 'RIBU ' + terbilang(n % 1000);
      if (n < 1000000000) return terbilang(Math.floor(n / 1000000)) + 'JUTA ' + terbilang(n % 1000000);
      return '';
    };

    if (num === 0) return 'SIFAR RINGGIT SAHAJA';

    const ringgit = Math.floor(num);
    const sen = Math.round((num - ringgit) * 100);

    let result = terbilang(ringgit) + 'RINGGIT ';
    if (sen > 0) result += 'DAN ' + terbilang(sen) + 'SEN ';
    return result + 'SAHAJA';
  }
}
