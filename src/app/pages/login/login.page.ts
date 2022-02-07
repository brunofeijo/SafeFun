import { Storage } from '@ionic/storage';
import { HomePage } from './../home/home.page';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  public loginUserName: string;
  public loginPassword: string;
  public dataAPI: number;
  public errAPI: number;
  public serverIP: any;
  public storedIP: any;

 
  constructor(

    public http: HttpClient,
    public route: Router,
    public storage: Storage,

  ) {}
 
  ngOnInit() {}

  public setData(value: any){
    this.storage.create();
    console.log();
    this.storage.set(this.serverIP, value);
    this.storedIP = this.storage.get(this.serverIP);
    console.log(typeof(this.storedIP));
  }

  public login() { 
    let postData =  {
      username: this.loginUserName,
      password: this.loginPassword,
      extra: "teste"
  }   
     this.http.post(this.storedIP, postData,{observe: 'response'}).subscribe(
       data => {
         this.dataAPI = data.status;
         if(this.dataAPI === 201){
          this.route.navigate(['/home'])
          alert("Seja bem vindo!")
         }        
        }, error => {
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


// const expr = 'Papayas';
// switch (expr) {
//   case 'Oranges':
//     console.log('Oranges are $0.59 a pound.');
//     break;
//   case 'Mangoes':
//   case 'Papayas':
//     console.log('Mangoes and papayas are $2.79 a pound.');
//     // expected output: "Mangoes and papayas are $2.79 a pound."
//     break;
//   default: