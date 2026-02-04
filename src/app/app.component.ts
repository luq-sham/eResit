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
    { title: 'Senarai Pelajar', url: '/pelajar', icon: 'people' },
    { title: 'Senarai Kelas', url: '/pelajar', icon: 'easel' },
  ];
  
  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.menu.enable(false)
  }
}
