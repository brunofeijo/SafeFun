import { environment } from './../../../environments/environment';
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { LoginJSON } from './../../model/loginJSON';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { PopoverController } from '@ionic/angular';
import { MessageBoxService } from 'src/app/util/message-box.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage {
  public loginJSON: LoginJSON = {};
  public serverIP = environment.serverIP;
  public viewPassword = 'password';

  constructor(
    private auth: AuthService,
    private storage: Storage,
    private popover: PopoverController,
    public msg: MessageBoxService,
  ) {
    this.storage.create();
}

  ngOnInit() {}

  public exibirOcultar() {
    this.viewPassword = this.viewPassword === 'text' ? 'password' : 'text';
 }

  public storeIP(){
    this.storage.set('1', this.serverIP);
     this.msg.presentAlert('IP Salvo com sucesso!');
    this.popover.dismiss();
  }

  public login() {
    if(this.serverIP === ''){
       this.msg.presentAlert('Configure primeiramente seu IP');
    }else if(this.loginJSON.login === '' || this.loginJSON.senha === ''){
       this.msg.presentAlert('Ops, campo usuário ou senha em branco!');
    }else{
      this.auth.login(this.serverIP, this.loginJSON);
    }
  }



















}
