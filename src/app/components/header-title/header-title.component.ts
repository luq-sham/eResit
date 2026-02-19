import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss'],
  standalone: false
})
export class HeaderTitleComponent implements OnInit {

  @Input() title: any
  @Input() subtitle: any
  constructor() { }

  ngOnInit() { }

}
