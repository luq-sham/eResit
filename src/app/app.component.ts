import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Menu Utama', url: '/menu-utama', icon: 'newspaper' },
    { title: 'Maklumat Pelajar', url: '/pelajar', icon: 'people' },
  ];
  
  constructor(
    // private menu: MenuController
  ) { }

  ngOnInit() {
    // this.menu.enable(false)
  }
}
