import { ToastBoxService } from './../util/toast-box.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
  
@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private loginUserName: string;
  private loginPassword: string;
  private serverIP: string;
  private dataAPI: any;
  private errAPI: any;

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
    };console.log(serverIP);
      this.http.post(serverIP, postData,{observe: 'response'}).subscribe(
        data => {
          if(data.status === 200){
            this.Toast.presentToast('Seja bem vindo ' + loginUserName);
            loginUserName = loginUserName;
            loginPassword = loginPassword;
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
            console.log(error);
         });
    }
  




}