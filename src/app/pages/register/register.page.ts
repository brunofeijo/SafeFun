import { Storage } from '@ionic/storage';
import { NewUserInfo } from './../../model/new-user-info';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public viewPassword = 'password';
  public newUserInfo: NewUserInfo = {};
  public serverIP = environment.serverIP;

  constructor(
    public auth: AuthService,
    public storage: Storage,

  ) { }

  ngOnInit() {
  }

  public exibirOcultar() {
    this.viewPassword = this.viewPassword === 'text' ? 'password' : 'text';
 }

  public registerNewUser(){
    this.storage.create();
    this.storage.get('1').then(
      data =>{
        this.serverIP = data;
        this.auth.createNewUser(this.newUserInfo, this.serverIP);
      }
    );
 }

  public logout() {
    this.auth.logout();
  }

}
