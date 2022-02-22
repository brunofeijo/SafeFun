import { ToastBoxService } from './../../util/toast-box.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerUserName: string; 
  public registerFullName: string;
  public registerPassword: string;
  public registerRole: string;
  public registerRegistration: string;
  public registerPasswordConfirmation: string;

  constructor(

    public auth: AuthService,
    public http: HttpClient,
    public toast: ToastBoxService,
    
  ) { }

  ngOnInit() {
  }

  public registerNewUser(){

    let postData =  {
      "id": 0,
      "idToken": "",
      "login": this.registerUserName,
      "nome": "",
      "perfil": "",
      "senha": this.registerPassword
  }
   
     this.http.post("http://192.168.200.245/cld-core/ativos-mobile/usuario", postData,{observe: 'response'})
       .subscribe(data => {
         if(data.status===200){
           this.toast.presentToast("Usuário criado com sucesso!");
         }
        
        }, error => {
         console.log(error);
       });
  }

  public logout() {
    this.auth.logout();
  }

}
