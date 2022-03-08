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

  public user: any = {};
  public password_type: string = 'password';

  constructor(

    public auth: AuthService,
    public http: HttpClient,
    public toast: ToastBoxService,
    
  ) { }

  ngOnInit() {
  }
  
  public exibirOcultar() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
 }

  public registerNewUser(){
     this.http.post("http://192.168.200.245/cld-core/ativos-mobile/usuario", this.user,{observe: 'response'})
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
