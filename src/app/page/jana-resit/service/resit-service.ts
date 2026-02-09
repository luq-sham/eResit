import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const PDF_COLORS = {
  primary: '#1E3A8A',
  accent: '#3B82F6',
  text: '#1F2937',
  lightGray: '#F3F4F6',
  white: '#FFFFFF',
  border: '#E5E7EB',
  muted: '#6B7280'
};

@Injectable({
  providedIn: 'root',
})
export class ResitService {
  constructor() {
    (pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs || (pdfFonts as any).vfs;
  }

  async generateReceipt(item: any, receiptInfo?: any, viewMode?: any) {
    const logo = await this.getBase64ImageFromURL('assets/logo-maahad.png');
    const totalAmount = item.detailsBayaran.reduce((acc: number, curr: any) => acc + (curr.jumlah || 0), 0);

    const receiptRows = item.detailsBayaran.map((detail: any, index: number) => [
      { text: `${index + 1}.`, style: 'tableCell', alignment: 'center' },
      { text: (detail.butiran || 'Yuran Sekolah').toUpperCase(), style: 'tableCell' },
      { text: `RM ${detail.jumlah?.toFixed(2) || '0.00'}`, alignment: 'right', style: 'tableCell' }
    ]);

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      header: () => this.getHeaderPage(item, receiptInfo),
      footer: () => this.getFooterPage(),
      info: { title: `${item?.namaPelajar?.toUpperCase()}-Resit` },
      content: [
        this.getHeaderSection(item, logo),
        { text: '\n' },
        this.getStudentDetails(item),
        { text: '\n' },
        this.getTableSection(receiptRows, totalAmount),
        { text: '\n' },
        this.getSummarySection(totalAmount),
        this.getFooterSection(item, viewMode)
      ],
      styles: this.getPdfStyles(),
      defaultStyle: { font: 'Roboto', fontSize: 10, color: PDF_COLORS.text }
    };

    const pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
    if (!viewMode) pdf.download(`${item?.namaPelajar}-Resit.pdf`);
  }

  private getHeaderPage(item: any, receipt?: any) {
    return {
      margin: [40, 20, 40, 0],
      columns: [{
        text: [
          { text: 'NO. RESIT: ', fontSize: 8, color: '#9CA3AF', bold: true },
          { text: receipt?.receipt_no || 'N/A', fontSize: 8, bold: true, color: PDF_COLORS.primary }
        ],
        alignment: 'right'
      }]
    };
  }

  private getHeaderSection(item: any, logo: any) {
    return {
      stack: [
        {
          table: {
            widths: [65, '*', 'auto'],
            body: [[
              { image: logo, fit: [65, 65], border: [false, false, false, false] },
              {
                stack: [
                  { text: 'MAAHAD TAHFIZ AL-MAWADDAH', style: 'companyName' },
                  { text: 'S 352 KG SRI LANGKAS, BATU 13 JLN KLANG, PUCHONG SELANGOR', style: 'companyAddress' },
                  { text: 'Tel: 017 2340 865 / 03 8060 1840', style: 'companyAddress' },
                  { text: 'Email: shahar0865@gmail.com / roziahbaharudin3@gmail.com', style: 'companyAddress' }
                ],
                margin: [10, 5, 0, 0]
              },
              { text: 'RESIT RASMI', style: 'receiptTitle', alignment: 'right', margin: [0, 3, 0, 0] }
            ]]
          },
          layout: 'noBorders'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 2, lineColor: PDF_COLORS.primary }],
          margin: [0, 10, 0, 10]
        }
      ]
    };
  }

  private getStudentDetails(item: any) {
    const formatRow = (l1: string, v1: string, l2: string, v2: string) => [
      { text: l1, style: 'label' }, { text: ':', style: 'label' }, { text: v1.toUpperCase(), style: 'value' },
      { text: l2, style: 'label' }, { text: ':', style: 'label' }, { text: v2.toUpperCase(), style: 'value' }
    ];

    return {
      style: 'infoContainer',
      table: {
        widths: ['20%', 'auto', '35%', '20%', 'auto', '35%'],
        body: [
          formatRow('NAMA', item.namaPelajar || '-', 'KELAS', item.kelas || '-'),
          formatRow('TARIKH BAYARAN', new Date(item.tarikhBayaran).toLocaleDateString('en-GB'), 'KAEDAH BAYARAN', item.jenisBayaran || 'TUNAI')
        ],
      },
      layout: 'noBorders',
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
            { text: 'JUMLAH KESELURUHAN', style: 'totalLabel', alignment: 'right', border: [false, false, false, false], margin: [0, 2, 0, 0] },
            { text: `RM ${total.toFixed(2)}`, style: 'totalValue', alignment: 'right', border: [false, false, false, false] }
          ]
        ]
      },
      layout: {
        fillColor: (i: number) => i === 0 ? PDF_COLORS.primary : (i === rows.length + 1 ? PDF_COLORS.lightGray : (i % 2 === 0 ? '#F9FAFB' : null)),
        hLineWidth: (i: number, node: any) => [0, 1, node.table.body.length - 1].includes(i) ? 0 : 0.5,
        vLineWidth: () => 0,
        hLineColor: PDF_COLORS.border,
        paddingTop: () => 6,
        paddingBottom: () => 6
      }
    };
  }

  private getSummarySection(totalAmount: number) {
    return {
      text: `Ringgit Malaysia: ${this.numberToMalayWords(totalAmount)}`,
      style: 'amountWords',
      alignment: 'right'
    };
  }

  private getFooterSection(item: any, viewMode?: any) {
    const dateStr = viewMode ? new Date(item.receiptDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
    return {
      margin: [0, 40, 0, 0],
      columns: [
        {
          stack: [
            { text: 'NOTA PENTING:', fontSize: 8, bold: true, color: PDF_COLORS.primary },
            { text: '1. Resit ini adalah cetakan komputer, tandatangan tidak diperlukan.', fontSize: 8, color: PDF_COLORS.muted },
            { text: '2. Sila simpan resit ini sebagai bukti pembayaran yang sah.', fontSize: 8, color: PDF_COLORS.muted }
          ]
        },
        {
          text: [
            { text: 'TARIKH DIJANA: ', bold: true, color: PDF_COLORS.muted, fontSize: 8 },
            { text: dateStr, bold: true, fontSize: 8 }
          ],
          alignment: 'right'
        }
      ]
    };
  }

  private getFooterPage() {
    return {
      text: '© MAAHAD TAHFIZ AL-MAWADDAH - Dijana oleh Sistem myResit Sekolah',
      fontSize: 7,
      color: '#838383',
      alignment: 'center',
      margin: [0, 20, 0, 0]
    };
  }

  private getPdfStyles(): any {
    return {
      companyName: { fontSize: 16, bold: true, color: PDF_COLORS.primary },
      companyAddress: { fontSize: 8, color: '#4B5563' },
      receiptTitle: { fontSize: 16, bold: true, color: PDF_COLORS.primary },
      label: {
        fontSize: 9, color: PDF_COLORS.muted, bold: true, margin: [0, 3, 0, 3]
      },
      value: {
        fontSize: 9, color: '#111827', bold: true, margin: [0, 3, 0, 3]
      },
      tableHeader: { fontSize: 9, bold: true, color: 'white', margin: [3, 4, 3, 4] },
      tableCell: { fontSize: 10, color: '#374151', margin: [3, 0, 3, 0] },
      totalLabel: { fontSize: 10, bold: true, color: PDF_COLORS.primary },
      totalValue: { fontSize: 13, bold: true, color: PDF_COLORS.primary, margin: [3, 0, 3, 0] },
      amountWords: { fontSize: 9, italics: true, bold: true, color: '#4B5563' }
    };
  }

  private getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        [canvas.width, canvas.height] = [img.width, img.height];
        canvas.getContext('2d')?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
      img.src = url;
    });
  }

  private numberToMalayWords(num: number): string {
    const a = ['', 'SATU ', 'DUA ', 'TIGA ', 'EMPAT ', 'LIMA ', 'ENAM ', 'TUJUH ', 'LAPAN ', 'SEMBILAN ', 'SEPULUH ', 'SEBELAS '];
    const terbilang = (n: number): string => {
      if (n < 12) return a[n];
      if (n < 20) return a[n - 10] + 'BELAS ';
      if (n < 100) return a[Math.floor(n / 10)] + 'PULUH ' + terbilang(n % 10);
      if (n < 1000) return (n < 200 ? 'SERATUS ' : a[Math.floor(n / 100)] + 'RATUS ') + terbilang(n % 100);
      if (n < 1000000) return (n < 2000 ? 'SERIBU ' : terbilang(Math.floor(n / 1000)) + 'RIBU ') + terbilang(n % 1000);
      return terbilang(Math.floor(n / 1000000)) + 'JUTA ' + terbilang(n % 1000000);
    };

    if (num === 0) return 'SIFAR RINGGIT SAHAJA';
    const ringgit = Math.floor(num);
    const sen = Math.round((num - ringgit) * 100);
    return `${terbilang(ringgit)}RINGGIT ${sen > 0 ? 'DAN ' + terbilang(sen) + 'SEN ' : ''}SAHAJA`;
  }
}