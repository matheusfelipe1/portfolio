import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { DialogModel } from 'src/app/models/dialog.models';
import { NavModel } from 'src/app/models/nav.models';
import { SendEmailModel } from 'src/app/models/sendEmail.models';
import { SessionService } from 'src/app/session.service';
import { Enviroments } from 'src/environments/environment';
const fileSaver = require('file-saver');

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
    // trigger('flip', [
    //   state('initial', style({
    //     opacity: 1,
    //     animation: 'fadeOut'
    //   })),
    //   state('final', style({
    //     opacity: 1,
    //     animation: 'fadeIn'
    //   })),
    //   transition('initial=>final', animate('420ms')),
    //   transition('final=>initial', animate('420ms'))
    // ]),

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
  name: string = "";
  enableWpp: boolean = false;
  enableEmail: boolean = false;
  sendEmail: SendEmailModel = {};
  piscando: boolean = true;
  loading: boolean = false;
  showDisplayResult: boolean = false;
  resultTitle: string = "";
  resultMsg: string = "";
  widthPage: number = window.innerWidth;
  isCollapsed: boolean = true;

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

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.nav = [
      { label: 'Início', value: true },
      { label: 'Sobre', value: false },
      { label: 'Habilidades', value: false },
      { label: 'Projetos', value: false },
      { label: 'Contato', value: false },
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
    setTimeout(() => {
      this.piscando = false;
    }, 1000)
    this._scrolling();
    this._switchNavWhenScrolling();
    this._switchScrollingInContact();
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
    this.isWpp = false;
    this.selectedValue = 'email';
  }
  flip2() {
    this.currentState3 = 'final';
    this.isWpp = true;
    this.selectedValue = 'wpp';
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
    if (data.label === 'Habilidades' || data.label === 'Projetos') {
      window.scrollTo({ top: find! - 160, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: find, behavior: 'smooth' });
    }
  }

  scroll(data: NavModel) {
    const find = document.getElementById(data.label!)?.offsetTop
    if (data.label === 'Habilidades' || data.label === 'Projetos') {
      window.scrollTo({ top: find! - 160, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: find, behavior: 'smooth' });
    }

  }

  showDisplayText(path: string, msg: string, title?: string) {
    this.dialog.path = path;
    this.dialog.msg = msg;
    this.dialog.title = title;
    this.showDisplay = true;
  }

  returnLinkWpp(): string {
    return Enviroments.whatsapp + Enviroments.phoneNumber + '&text=' + Enviroments.defaultMsgFirst + this.name + Enviroments.defaultMsgLast
  }

  returnLinkedIn(): string {
    return Enviroments.linkedin
  }

  returnGitHub(): string {
    return Enviroments.github;
  }

  openWpp(): void {
    const doc = document.getElementById('wppId');
    doc?.click();
  }

  openLinkedIn(): void {
    const doc = document.getElementById('linkedinId');
    doc?.click();
  }

  openGitHub(): void {
    const doc = document.getElementById('githubId');
    doc?.click();
  }

  returnValidForm(): boolean {
    if ((this.sendEmail.email !== "" && this.sendEmail.email !== undefined) &&
      (this.sendEmail.name !== "" && this.sendEmail.name !== undefined) &&
      (this.sendEmail.text !== "" && this.sendEmail.text !== undefined)) {
      return true;
    } else {
      return false;
    }
  }

  _switchScrollingInContact() {
    if (this.widthPage > 768) {
      window.addEventListener('scroll', (e: any) => {
        const element = document.getElementById('Contato');
        const element2 = document.getElementById('nav');
        var rect = element?.getBoundingClientRect();
        var rect2 = element2?.getBoundingClientRect();
        let doc = window.scrollY;
        var newrect = rect?.top! - rect2?.top!
        const el1 = document.getElementsByClassName('1');
        const el2 = document.getElementsByClassName('2');
        if (doc >= newrect) {
          for (let index = 0; index < el1.length; index++) {
            const element = el1[index];
            element.classList.add('animationContact');
          }
          for (let index = 0; index < el2.length; index++) {
            const element = el2[index];
            element.classList.add('animationContact2');
          }
        } else {
          for (let index = 0; index < el1.length; index++) {
            const element = el1[index];
            element.classList.remove('animationContact');
          }
          for (let index = 0; index < el2.length; index++) {
            const element = el2[index];
            element.classList.remove('animationContact2');
          }
        }
      })
    }
  }

  piscar() {
    this.piscando = true;
    setTimeout(() => {
      this.piscando = false;
      this.dowloadCv()
    }, 700);

  }

  postEmail(): void {
    this.loading = true;
    const body = {
      name: this.sendEmail.name,
      text: this.sendEmail.text,
      email: this.sendEmail.email
    };
    this.sessionService.sendEmail(body).subscribe({
      next: (value: any) => {
        console.log(value);
        this.loading = false;
        this.showDisplayResult = true;
        this.resultTitle = 'Sucesso';
        this.resultMsg = 'E-mail enviado com sucesso!';
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
        this.showDisplayResult = true;
        this.resultTitle = 'Erro';
        this.resultMsg = 'Erro ao enviar o e-mail';
      }
    });
  }
  async dowloadCv() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/curriculo_matheus.pdf");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (this.status === 200) {
        var blob = new Blob([xhr.response], { type: 'application/pdf' });
        fileSaver.saveAs(blob, 'cv_matheus.pdf')
      }
    };
    xhr.send();
  }

}
