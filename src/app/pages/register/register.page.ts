import { ToastBoxService } from './../../util/toast-box.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public username: string; 
  public password: string;

  constructor(
    public http: HttpClient,
    public toast: ToastBoxService,
  ) { }

  ngOnInit() {
  }

  public registerNewUser(){

    let postData =  {
      "id": 0,
      "idToken": "",
      "login": this.username,
      "nome": "",
      "perfil": "",
      "senha": this.password
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

  

}
