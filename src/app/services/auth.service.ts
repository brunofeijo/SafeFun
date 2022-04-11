import { MessageBoxService } from './../util/message-box.service';

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
import { NewUserInfo } from './../model/new-user-info';
import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginJSON } from '../model/loginJSON';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  public loginJSON: LoginJSON = {};
  public userConnected = false;
  public serverIP = environment.serverIP;

  constructor(
  public http: HttpClient,
  public route: Router,
  public msg: MessageBoxService,

  ) {}

  public createNewUser(newUser: NewUserInfo, serverIP: string) {
    this.http.post(serverIP, newUser, {headers:{
      authorization: '"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJBRE0iLCJpc3MiOiJodHRwOi8vY2xkLWNvcmUvIiwiaWF0IjoxNjQ2NzY5MTQ3LCJleHAiOjE2NDY3NzY1NDd9.yLrVK7C_RZnkFuZFo9Dsbhqd5YoOJ1MgpTIuhl54bZs"',
    }}).subscribe(
      data => {
        console.log(data);
        newUser = data;
      }
    );
  }

  public login(serverIP: string, login: LoginJSON) {
    console.log(login);
    this.http.post(`${serverIP}/login`, login).subscribe(
      data => {
        console.log(data);
        this.loginJSON = data;
        this.route.navigate(['/home']);
        this.userConnected = true;

      }, error =>{
        console.log(error, 'subscribe error)');
        switch(error.status){
          case 401:
            this.msg.presentAlert('Usuário ou senha inválidos');
            break;
          case 404:
             this.msg.presentAlert('Usuário não cadastrado!');
            break;
        }
      }
      );
  }

  public logout() {
    this.userConnected = false;
    this.route.navigate(['/login']);
  }



}
