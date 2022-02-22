import { ToastBoxService } from './../util/toast-box.service';
import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginPage } from '../pages/login/login.page';
  
@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private loginUserName: string;
  private loginPassword: string;
  private serverIP: string;
  private dataAPI: any;
  private errAPI: any;
  public userConnected: boolean = false;

  constructor(
  private http: HttpClient,
  private route: Router,
  private Toast: ToastBoxService,
  
  ) {}
  
  public login(loginUserName: string, loginPassword: string, serverIP: string) {  
    let postData = {
      "id": 0,
      "idToken": "",
      "login": loginUserName,
      "nome": "",
      "perfil": "",
      "senha": loginPassword,
    };
      this.http.post(serverIP, postData,{observe: 'response'}).subscribe(
        data => {
          if(data.status === 200){
            this.Toast.presentToast('Seja bem vindo ' + loginUserName);
            this.userConnected = true;
            this.route.navigate(['/home']);
          }        
        },error => {
            this.errAPI = error.status
            switch(this.errAPI){
              case 400:
                alert("Usuário e senha obrigatórios");
                break;
              case 401:
                alert("Usuário ou senha inválido")
                break;
              case 404:
                alert("Servidor não encontrado")
                break;
              default:
            }
         });
    }
  
  public logout() {
    this.userConnected = false;
    this.route.navigate(['/login']);
  }



}