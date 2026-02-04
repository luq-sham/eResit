import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// Setup pdfMake fonts
const vfs = (pdfFonts as any).pdfMake ? (pdfFonts as any).pdfMake.vfs : (pdfFonts as any).vfs;
(pdfMake as any).vfs = vfs;

@Injectable({
  providedIn: 'root',
})
export class ResitService {
  private primaryColor = '#1a3a5f'; // Professional Navy
  private secondaryColor = '#f8f9fa'; // Light Gray Background

  async generateReceipt(item: any) {
    const logo = await this.getBase64ImageFromURL('assets/receipt-icon.ico');

    const receiptRows = item.detailsBayaran.map((detail: any) => [
      { text: detail.butiran || 'Yuran Sekolah', style: 'tableData' },
      { text: `RM ${detail.jumlah?.toFixed(2) || '0.00'}`, alignment: 'right', style: 'tableData' }
    ]);

    const documentDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 40, 40, 40],
      content: [
        this.getSchoolHeader(item, logo),
        { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 515, y2: 10, lineWidth: 1.5, lineColor: this.primaryColor }] },
        { text: '\n' },
        this.getStudentInfoSection(item),
        { text: 'BUTIRAN PEMBAYARAN', style: 'sectionTitle' },
        this.getFeeDetailsTable(receiptRows),
        this.getSummarySection(item),
        this.getFooter()
      ],
      styles: this.getPdfStyles()
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  private getSchoolHeader(item: any, logo: any) {
    return {
      columns: [
        { image: logo, fit: [60, 60], width: 'auto' },
        {
          stack: [
            { text: 'SMK CYBERJAYA HIGH SCHOOL', style: 'schoolName' },
            { text: 'Persiaran Bestari, 63000 Cyberjaya, Selangor', style: 'schoolSub' },
            { text: 'Tel: 03-12345678 | Email: admin@school.edu.my', style: 'schoolSub' }
          ],
          margin: [15, 5, 0, 0],
          width: '*'
        },
        {
          stack: [
            { text: 'RESIT RASMI', style: 'mainHeader' },
            { text: (item.id ? 'RES-' + item.id.substring(0, 8).toUpperCase() : 'N/A'), style: 'receiptNo' },
            { text: `TARIKH: ${new Date().toLocaleDateString('en-GB')}`, fontSize: 9 }
          ],
          alignment: 'right',
          width: 150
        }
      ]
    };
  }

  private getStudentInfoSection(item: any) {
    return {
      style: 'infoBox',
      table: {
        widths: ['15%', '35%', '15%', '35%'],
        body: [
          [
            { text: 'NAMA', style: 'infoLabel' },
            { text: (item.namaPelajar || 'N/A').toUpperCase(), style: 'infoValue' },
            { text: 'KELAS', style: 'infoLabel' },
            { text: (item.kelas || 'N/A').toUpperCase(), style: 'infoValue' }
          ],
          [
            { text: 'TARIKH', style: 'infoLabel' },
            { text: item.tarikhBayaran ? new Date(item.tarikhBayaran).toLocaleDateString('en-GB') : 'N/A', style: 'infoValue' },
            { text: 'MOD', style: 'infoLabel' },
            { text: (item.jenisBayaran || 'TUNAI').toUpperCase(), style: 'infoValue' }
          ]
        ]
      },
      layout: 'noBorders'
    };
  }

  private getFeeDetailsTable(rows: any[]) {
    return {
      table: {
        headerRows: 1,
        widths: ['*', 120],
        body: [
          [
            { text: 'PERKARA', style: 'tableHeader' },
            { text: 'JUMLAH (RM)', style: 'tableHeader', alignment: 'right' }
          ],
          ...rows
        ]
      },
      layout: {
        fillColor: (rowIndex: number) => (rowIndex % 2 === 0 && rowIndex !== 0) ? this.secondaryColor : null,
        hLineWidth: (i: number, node: any) => (i === 0 || i === 1 || i === node.table.body.length) ? 1 : 0.5,
        hLineColor: (i: number) => (i === 0 || i === 1) ? this.primaryColor : '#e0e0e0',
        vLineWidth: () => 0,
        paddingTop: () => 8,
        paddingBottom: () => 8
      }
    };
  }

  private getSummarySection(item: any) {
    const totalAmount = item.jumlahBayaran || 0;
    return {
      margin: [0, 15, 0, 0],
      columns: [
        { text: `Jumlah Ringgit: ${this.numberToMalayWords(totalAmount)}`, style: 'amountWords', width: '*' },
        {
          width: 180,
          table: {
            widths: ['*', 'auto'],
            body: [
              [
                { text: 'JUMLAH BAYARAN', bold: true, fontSize: 11, margin: [0, 5, 0, 5], color: '#000' },
                { text: `RM ${totalAmount.toFixed(2)}`, style: 'totalAmount', color: '#000' }
              ]
            ]
          },
          layout: {
            // fillColor: this.primaryColor,
            hLineWidth: () => 0,
            vLineWidth: () => 0
          }
        }
      ]
    };
  }

  private getFooter() {
    return {
      stack: [
        { text: '\n\n' },
        { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 515, y2: 10, lineWidth: 0.5, lineColor: '#bdc3c7' }] },
        {
          text: 'Resit ini dijana oleh komputer dan tidak memerlukan tandatangan basah.\nSila simpan resit ini sebagai bukti pembayaran.',
          style: 'footerText'
        }
      ]
    };
  }

  private getPdfStyles() {
    return {
      schoolName: { fontSize: 14, bold: true, color: this.primaryColor },
      schoolSub: { fontSize: 8, color: '#555' },
      mainHeader: { fontSize: 18, bold: true, color: this.primaryColor, letterSpacing: 1 },
      receiptNo: { fontSize: 11, bold: true, color: '#c0392b', margin: [0, 2, 0, 2] },
      sectionTitle: { fontSize: 10, bold: true, color: this.primaryColor, margin: [0, 15, 0, 5] },
      infoBox: { margin: [0, 5, 0, 15] },
      infoLabel: { fontSize: 8, color: '#7f8c8d', bold: true },
      infoValue: { fontSize: 9, bold: true, color: '#2c3e50' },
      tableHeader: { bold: true, fontSize: 9, color: 'white', fillColor: this.primaryColor, margin: [5, 4, 5, 4] },
      tableData: { fontSize: 9, margin: [5, 2, 5, 2] },
      amountWords: { fontSize: 8, italics: true, color: '#444', margin: [0, 10, 0, 0] },
      totalAmount: { fontSize: 12, bold: true, margin: [0, 5, 5, 5], alignment: 'right' },
      footerText: { fontSize: 8, color: '#95a5a6', italics: true, alignment: 'center', margin: [0, 10, 0, 0] }
    };
  }

  private getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
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
      img.onerror = reject;
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
