import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
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

  changeState() {
    if (this.canAnimate === true) {
      this.canAnimate = false;
      this.currentState = 'final';
      setTimeout(() => {
        this.changeState2();
        console.log('aqui')
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
    this._scrolling()
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
      var rect = element?.getBoundingClientRect();
      let doc = window.scrollY;
      if (doc >= rect?.top!) {
        this.changeState();
      }
    })
  }

  _offsetPositionInPage(data: NavModel) {
    const doc = document.getElementById(data.label!);
    let element = doc?.getBoundingClientRect();
    window.scrollTo({left: 0, top: element?.top})
  }

}
