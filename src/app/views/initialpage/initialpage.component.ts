import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { DialogModel } from 'src/app/models/dialog.models';
import { NavModel } from 'src/app/models/nav.models';

@Component({
  selector: 'app-initialpage',
  templateUrl: './initialpage.component.html',
  styleUrls: ['./initialpage.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        height: '0px'
      })),
      state('final', style({
        height: '50rem'
      })),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('700ms'))
    ]),
    trigger('fadeImgs', [
      state('initial', style({
        opacity: 0.0,
        animation: 'fadeOut'
      })),
      state('final', style({
        opacity: 1,
        animation: 'fadeIn'
      })),
      transition('initial=>final', animate('700ms')),
      transition('final=>initial', animate('700ms'))
    ]),
    trigger('flip', [
      state('initial', style({
        transform: 'rotateX(0deg)'
      })),
      state('final', style({
        transform: 'rotateX(360deg)'
      })),
      transition('initial=>final', animate('420ms')),
      transition('final=>initial', animate('420ms'))
    ]),
    
  ]
})
export class InitialpageComponent {

  nav: NavModel[] = [];
  navSelected: NavModel = {};
  images: string[] = [];
  selectedValue: string = 'email';
  currentState = 'initial';
  currentState2 = 'initial';
  currentState3 = 'initial';
  canAnimate: boolean = true;
  isWpp: boolean = false;
  showDisplay: boolean = false;
  dialog: DialogModel = {};

  changeState() {
    if (this.canAnimate === true) {
      this.canAnimate = false;
      this.currentState = 'final';
      setTimeout(() => {
        this.changeState2();
      }, 2000)
      setTimeout(() => {
      this.canAnimate = true;
      }, 1500)
    }
    
  }
  leaveState() {
    if (this.canAnimate === true) {
      this.canAnimate = false;
      this.currentState2 = 'initial';
      this.currentState = 'initial';
      setTimeout(() => {
        this.canAnimate = true;
      }, 1500)
    }
  }

  changeState2() {
    this.currentState2 = 'final';
  }

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
    ];
    this._scrolling();
    this._switchNavWhenScrolling();
  }

  onChangeNav(select: NavModel) {
    this.nav.map((e) => e.value = false);
    select.value = true;
    this.nav.map((e) => {
      if (e.label === select.label) {
        e = select
      }
    });
    this._offsetPositionInPage(select);
  }

  flip1() {
    this.currentState3 = 'initial';
    setTimeout(() => {
      this.isWpp = false;
    }, 300)
  }
  flip2() {
    this.currentState3 = 'final';
    setTimeout(() => {
      this.isWpp = true;
    }, 300)
  }

  _scrolling() {
    window.addEventListener('scroll', (e: any) => {
      const element = document.getElementById('animation1');
      const element2 = document.getElementById('nav');
      var rect = element?.getBoundingClientRect();
      var rect2 = element2?.getBoundingClientRect();
      let doc = window.scrollY;
      var newrect = rect?.top! - rect2?.top!
      if (doc >= newrect) {
        this.changeState();
      }
    })
  }

  _switchNavWhenScrolling() {
    window.addEventListener('scroll', (e: any) => {
      let array: number[] = [];
      let newarray: number[] = [];
      const inicio = document.getElementById('Início')?.getBoundingClientRect();
      const sobre = document.getElementById('Sobre')?.getBoundingClientRect();
      const habilidades = document.getElementById('Habilidades')?.getBoundingClientRect();
      const projetos = document.getElementById('Projetos')?.getBoundingClientRect();
      const contato = document.getElementById('Contato')?.getBoundingClientRect();
      const element2 = document.getElementById('nav')?.getBoundingClientRect();
      array.push(inicio?.y! - element2?.y!);
      array.push(sobre?.y! - element2?.y!);
      array.push(habilidades?.y! - element2?.y!);
      array.push(projetos?.y! - element2?.y!);
      array.push(contato?.y! - element2?.y!);
      newarray = array.filter(e => e >= 0);
      switch (newarray.length) {
        case 5:
          this.nav.map(e => e.label === 'Início' ? e.value = true : e.value = false);
          break;
        case 4:
          this.nav.map(e => e.label === 'Sobre' ? e.value = true : e.value = false);
          break;
        case 3:
          this.nav.map(e => e.label === 'Habilidades' ? e.value = true : e.value = false);
          break;
        case 2:
          this.nav.map(e => e.label === 'Projetos' ? e.value = true : e.value = false);
          break;
        default:
          this.nav.map(e => e.label === 'Contato' ? e.value = true : e.value = false);
          break;
      }
    });
  }

  _offsetPositionInPage(data: NavModel) {
    const find = document.getElementById(data.label!)?.offsetTop
    window.scrollTo({left: 0, top: find})
  }

  showDisplayText(path: string, msg: string, title?: string) {
    this.dialog.path = path;
    this.dialog.msg = msg;
    this.dialog.title = title;
    this.showDisplay = true;
  }
}
