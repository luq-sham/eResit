import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// UPDATED: Colors changed to Black & White scheme
const PDF_COLORS = {
  primary: '#000000', // Black
  accent: '#000000',  // Black
  text: '#000000',    // Black
  lightGray: '#F3F4F6',
  white: '#FFFFFF',
  border: '#000000',  // Black borders for B&W look
  muted: '#4B5563',   // Dark gray for muted text
  success: '#000000',
  danger: '#000000'
};

@Injectable({
  providedIn: 'root',
})
export class PayslipService {
  constructor() {
    (pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs || (pdfFonts as any).vfs;
  }

  async generatePayslip(data: any, viewMode?: boolean) {
    const item = data.return_value_set_1 || data;
    const logo = await this.getBase64ImageFromURL('assets/logo-maahad.png');

    const totalEarning = item.totalEarning || 0;
    const totalDeduction = item.totalDeduction || 0;
    const netPay = totalEarning - totalDeduction;

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      header: () => this.getHeaderPage(item),
      footer: () => this.getFooterPage(),
      info: { title: `${item?.namaKakitangan?.toUpperCase()}-Payslip` },
      content: [
        this.getHeaderSection(logo),
        { text: '\n' },
        this.getEmployeeDetails(item),
        { text: '\n' },
        this.getFinancialTable(item),
        { text: '\n' },
        this.getSummarySection(totalEarning, totalDeduction, netPay),
        this.getFooterSection(item, viewMode)
      ],
      styles: this.getPdfStyles(),
      defaultStyle: { font: 'Roboto', fontSize: 10, color: PDF_COLORS.text }
    };

    const pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
    if (!viewMode) pdf.download(`${item?.namaKakitangan}-Payslip.pdf`);
  }

  private getHeaderPage(item: any) {
    const dateObj = new Date(item.paymentMonth);
    const monthYear = dateObj.toLocaleDateString('ms-MY', { month: 'long', year: 'numeric' }).toUpperCase();

    return {
      margin: [40, 20, 40, 0],
      columns: [{
        text: [
          // UPDATED: Color set to primary (black)
          { text: 'BULAN: ', fontSize: 8, color: PDF_COLORS.primary, bold: true },
          { text: monthYear, fontSize: 8, bold: true, color: PDF_COLORS.primary }
        ],
        alignment: 'right'
      }]
    };
  }

  private getHeaderSection(logo: any) {
    return {
      stack: [
        {
          table: {
            widths: [65, '*', 'auto'],
            body: [[
              // Image remains colored
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
              { text: 'PENYATA GAJI', style: 'receiptTitle', alignment: 'right', margin: [0, 3, 0, 0] }
            ]]
          },
          layout: 'noBorders'
        },
        {
          // UPDATED: Line color to black
          canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 2, lineColor: PDF_COLORS.primary }],
          margin: [0, 10, 0, 10]
        }
      ]
    };
  }

  private getEmployeeDetails(item: any) {
    return {
      style: 'infoContainer',
      table: {
        widths: ['15%', '35%', '15%', '35%'],
        body: [
          [
            { text: 'NAMA', style: 'label' },
            { text: ': ' + (item.namaKakitangan || '-').toUpperCase(), style: 'value' },
            { text: 'NO. KP', style: 'label' },
            { text: ': ' + (item.noKP || '-').toUpperCase(), style: 'value' }
          ],
          [
            { text: 'NO. TEL', style: 'label' },
            { text: ': ' + (item.noTel || '-').toUpperCase(), style: 'value' },
            { text: '', style: 'label' },
            { text: '', style: 'value' }
          ]
        ],
      },
      layout: 'noBorders',
    };
  }

  private getFinancialTable(item: any) {
    const earnings = item.earning || [];
    const deductions = item.deduction || [];
    const maxRows = Math.max(earnings.length, deductions.length);
    const tableBody = [];

    tableBody.push([
      { text: 'BUTIRAN PENDAPATAN', style: 'tableHeader', alignment: 'left', color: PDF_COLORS.primary },
      { text: 'RM', style: 'tableHeader', alignment: 'right', color: PDF_COLORS.primary },
      { text: 'BUTIRAN POTONGAN', style: 'tableHeader', alignment: 'left', color: PDF_COLORS.primary },
      { text: 'RM', style: 'tableHeader', alignment: 'right', color: PDF_COLORS.primary }
    ]);

    for (let i = 0; i < maxRows; i++) {
      const earn = earnings[i];
      const ded = deductions[i];
      tableBody.push([
        { text: earn ? earn.butiran.toUpperCase() : '', style: 'tableCell' },
        { text: earn ? earn.jumlah.toFixed(2) : '', style: 'tableCell', alignment: 'right' },
        { text: ded ? ded.butiran.toUpperCase() : '', style: 'tableCell' },
        { text: ded ? ded.jumlah.toFixed(2) : '', style: 'tableCell', alignment: 'right' }
      ]);
    }

    if (maxRows < 5) {
      for (let j = maxRows; j < 5; j++) {
        tableBody.push([{ text: ' ', style: 'tableCell' }, { text: ' ', style: 'tableCell' }, { text: ' ', style: 'tableCell' }, { text: ' ', style: 'tableCell' }]);
      }
    }

    return {
      table: {
        headerRows: 1,
        widths: ['*', 70, '*', 70],
        body: tableBody
      },
      layout: {
        // UPDATED: Border colors to black
        hLineWidth: (i: number, node: any) => i === 0 || i === 1 || i === node.table.body.length ? 0.5 : 0,
        vLineWidth: (i: number) => i === 2 ? 0.5 : 0,
        hLineColor: PDF_COLORS.primary,
        vLineColor: PDF_COLORS.primary,
        paddingTop: () => 6,
        paddingBottom: () => 6
      }
    };
  }

  private getSummarySection(totalEarn: number, totalDed: number, netPay: number) {
    return {
      stack: [
        {
          table: {
            widths: ['*', 70, '*', 70],
            body: [
              [
                { text: 'JUMLAH PENDAPATAN', style: 'totalLabel', alignment: 'right', border: [false, false, false, false] },
                { text: totalEarn.toFixed(2), style: 'totalValue', alignment: 'right', border: [false, true, false, false], borderColor: [PDF_COLORS.primary, PDF_COLORS.primary, PDF_COLORS.primary, PDF_COLORS.primary] },
                { text: 'JUMLAH POTONGAN', style: 'totalLabel', alignment: 'right', border: [false, false, false, false] },
                { text: totalDed.toFixed(2), style: 'totalValue', alignment: 'right', border: [false, true, false, false], borderColor: [PDF_COLORS.primary, PDF_COLORS.primary, PDF_COLORS.primary, PDF_COLORS.primary] }
              ]
            ]
          },
          layout: 'noBorders'
        },
        { text: '\n' },
        {
          table: {
            widths: ['*', 'auto'],
            body: [[
              {
                text: `RINGGIT MALAYSIA: ${this.numberToMalayWords(netPay)}`,
                style: 'amountWords',
                alignment: 'left',
                margin: [0, 8, 0, 0],
                border: [false, false, false, false]
              },
              {
                stack: [
                  { text: 'GAJI BERSIH', fontSize: 9, alignment: 'center', color: PDF_COLORS.text, bold: true },
                  { text: `RM ${netPay.toFixed(2)}`, fontSize: 16, alignment: 'center', color: PDF_COLORS.primary, bold: true }
                ],
                border: [true, true, true, true],
                // UPDATED: Border color to black
                borderColor: [PDF_COLORS.primary, PDF_COLORS.primary, PDF_COLORS.primary, PDF_COLORS.primary],
                margin: [20, 5, 20, 5]
              }
            ]]
          }
        }
      ]
    };
  }

  private getFooterSection(item: any, viewMode?: any) {
    const dateStr = viewMode ? new Date().toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
    return {
      margin: [0, 40, 0, 0],
      columns: [
        {
          text: [
            { text: 'TARIKH CETAKAN: ', bold: true, color: PDF_COLORS.muted, fontSize: 8 },
            { text: dateStr, bold: true, fontSize: 8 }
          ],
          alignment: 'right',
          margin: [0, 50, 0, 0]
        }
      ]
    };
  }

  private getFooterPage() {
    return {
      text: '© MAAHAD TAHFIZ AL-MAWADDAH - Sulit & Persendirian',
      fontSize: 7,
      color: PDF_COLORS.muted,
      alignment: 'center',
      margin: [0, 20, 0, 0]
    };
  }

  private getPdfStyles(): any {
    return {
      companyName: { fontSize: 16, bold: true, color: PDF_COLORS.primary },
      companyAddress: { fontSize: 8, color: '#000000' }, // Darker gray for readability
      receiptTitle: { fontSize: 16, bold: true, color: PDF_COLORS.primary },
      label: { fontSize: 9, color: PDF_COLORS.primary, bold: true, margin: [0, 3, 0, 3] },
      value: { fontSize: 9, color: '#000000', bold: true, margin: [0, 3, 0, 3] },
      tableHeader: { fontSize: 9, bold: true, margin: [3, 4, 3, 4] },
      tableCell: { fontSize: 9, color: '#000000', margin: [3, 2, 3, 2] },
      totalLabel: { fontSize: 9, bold: true, color: PDF_COLORS.primary },
      totalValue: { fontSize: 10, bold: true, color: '#000000' },
      amountWords: { fontSize: 9, italics: true, bold: true, color: '#000000' }
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
      // Fallback for image loading error
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