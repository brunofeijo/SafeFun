import { HomePage } from './../home/home.page';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { PopoverController } from '@ionic/angular';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  public loginUserName: string;
  public loginPassword: string;
  public serverIP: string ='http://192.168.200.245/cld-core/ativos-mobile/login';
  
  constructor(
    private auth: AuthService,
    private storage: Storage,
    private popover: PopoverController,
  ) {}
 
  ngOnInit() {} 
  
  public storeIP(){
    this.storage.create();
    this.storage.set('1', this.serverIP);
    alert('IP salvo com sucesso!');
    this.popover.dismiss();
    
  }

  public login() {
    if(this.loginUserName==''||this.loginPassword==''){
      alert('Não esqueça de digitar seu usuário e senha!')}    
    else {
      if(this.serverIP==''){
        alert('Você deve primeiramente informar o IP do servidor!')}
    else{
      this.storage.get('1').then(
        data => {
          console.log(this.serverIP);
          this.serverIP = data;
          this.auth.login(this.loginUserName, this.loginPassword, this.serverIP);
          if(this.auth.userConnected == true){
            this.loginUserName = '';
            this.loginPassword = '';
          }
        }
      )
    
      }
    }
  }

}