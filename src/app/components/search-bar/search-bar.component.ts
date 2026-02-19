import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: false
})
export class SearchBarComponent implements OnInit {

  @Input() categoryList: any[] = [
    { value: 1, label: 'Nama Pelajar' },
    { value: 2, label: 'Kelas' }
  ]

  @Output() onSearchEvent = new EventEmitter()

  category: any = 1
  searchText: any = ''

  constructor() { }

  ngOnInit() { }

  onSearch() {
    this.onSearchEvent.emit({ category: this.category, searchText: this.searchText.trim() })
  }

}
