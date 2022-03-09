import { ToastBoxService } from './../util/toast-box.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginJSON } from '../model/loginJSON';
  
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private loginInformation: any;
  private loginJSON: LoginJSON;
  public loginIdToken: string;
  private APIerror: any;
  public userConnected: boolean = false;
  public user: any;

  constructor(
  private http: HttpClient,
  private route: Router,
  private Toast: ToastBoxService,
  
  ) {}

  public login(loginUserName: string, loginPassword: string, serverIP: string) {  
    let postData = {
      "idToken": "",
      "id": 0,
      "nome": '',
      "login": loginUserName,
      "perfil": "",
      "senha": loginPassword,
    };
      this.http.post(serverIP, postData, {observe: 'body'}).subscribe(
        data => {
            this.loginInformation = data;
            this.loginJSON = this.loginInformation;
            this.loginIdToken = this.loginJSON.idToken;
          if(Object.values(data === 200)){
            this.Toast.presentToast('Seja bem vindo');
            this.userConnected = true;
            this.route.navigate(['/home']);
          }        
        },error => {
            this.APIerror = error.status
            switch(this.APIerror){
              case 400:
                this.Toast.presentToast("Usuário e senha obrigatórios");
                break;
              case 401:
                this.Toast.presentToast("Usuário ou senha inválido")
                break;
              case 404:
                this.Toast.presentToast("Servidor não encontrado")
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