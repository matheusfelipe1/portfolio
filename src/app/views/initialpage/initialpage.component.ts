import { Component } from '@angular/core';
import { NavModel } from 'src/app/models/nav.models';

@Component({
  selector: 'app-initialpage',
  templateUrl: './initialpage.component.html',
  styleUrls: ['./initialpage.component.css']
})
export class InitialpageComponent {

  nav: NavModel[] = [];
  navSelected: NavModel = {};
  images: string[] = [];
  selectedValue: string = 'email';
  constructor() {}

  ngOnInit() {
    this.nav = [
      {label: 'Início', value: true},
      {label: 'Sobre', value: false},
      {label: 'Habilidades', value: false},
      {label: 'Projetos', value: false},
      {label: 'Contato', value: false},
    ]
    this.images = [
      "../../../assets/images/1.png",
      "../../../assets/images/2.png",
      "../../../assets/images/3.png",
      "../../../assets/images/4.png",
      "../../../assets/images/5.png",
      "../../../assets/images/6.png",
      "../../../assets/images/7.png",
    ]
  }

  onChangeNav(select: NavModel) {
    this.nav.map((e) => e.value = false);
    select.value = true;
    this.nav.map((e) => {
      if (e.label === select.label) {
        e = select
      }
    })
  }

}
