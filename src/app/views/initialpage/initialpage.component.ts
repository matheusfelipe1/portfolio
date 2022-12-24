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

  constructor() {}

  ngOnInit() {
    this.nav = [
      {label: 'Início', value: true},
      {label: 'Sobre', value: false},
      {label: 'Habilidades', value: false},
      {label: 'Projetos', value: false},
      {label: 'Contato', value: false},
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
