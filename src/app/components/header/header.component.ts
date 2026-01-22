import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {

  showMenu: any = true
  @Input() title: any
  @Input() showBackBtn: any = false

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() { }

  toggleMenu() {
    this.showMenu = !this.showMenu
    this.menu.enable(this.showMenu); // toggle open/close
  }
}
