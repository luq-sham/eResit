import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { TabelService } from 'src/app/components/table/service/tabel-service';
import { ApiService } from 'src/app/services/api-service';
import { PayslipService } from '../jana-slip-gaji/services/payslip-service';

@Component({
  selector: 'app-senarai-slip-gaji',
  templateUrl: './senarai-slip-gaji.page.html',
  styleUrls: ['./senarai-slip-gaji.page.scss'],
  standalone: false
})
export class SenaraiSlipGajiPage implements OnInit {

  categories = [
    { value: 1, label: "Nama Kakitangan" },
    { value: 2, label: "No. KP / Passport" },
  ]
  search: any = ''
  selectedCategory: any = 1

  tableHeader: any
  tableData: any
  tablePaging = { currentPage: 1, record: 10, totalPages: 1 }

  isLoading = true

  constructor(
    private apiService: ApiService,
    private tableService: TabelService,
    private alertService: AlertService,
    private payslipService: PayslipService
  ) { }

  ngOnInit() {
    this.initTable()
  }

  initTable() {
    this.tableHeader = this.tableService.getTableHeader('lihat-payslip')
    this.initData()
  }

  initData() {
    const params = {
      page: this.tablePaging.currentPage,
      table_type: 2,
      record: this.tablePaging.record,
      search: this.search,
      category: this.selectedCategory
    };

    this.apiService.getPaySlipFIltered(params).subscribe({
      next: async (res) => {
        this.tableData = res.return_value_set_1
        this.isLoading = false
      },
      error: async (err) => {
        this.alertService.apiErrorAlert()
        this.isLoading = false
      }
    })
  }

  onPageChange(page: number) {
    this.tablePaging.currentPage = page;
    this.initData();
  }

  onRecordChange(record: number) {
    this.isLoading = true
    this.tablePaging.record = record;
    this.tablePaging.currentPage = 1;
    this.initData();
  }

  onSearch(item: any) {
    this.isLoading = true
    this.search = item.searchText
    this.selectedCategory = item.category

    this.initData()
  }

  async onLihat(item: any) {
    this.payslipService.generatePayslip(item, true)
  }
}
