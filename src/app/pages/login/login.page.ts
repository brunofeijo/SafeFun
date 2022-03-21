import { HomePage } from './../home/home.page';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { PopoverController } from '@ionic/angular';
import { ToastBoxService } from 'src/app/util/toast-box.service';

 
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
    
    private Toast: ToastBoxService,
    private auth: AuthService,
    private storage: Storage,
    private popover: PopoverController,
  ) {this.test();}
 
  ngOnInit() {} 

  test(){
alert("Um retorno de carro está\rbem no meio desta linha!");
alert("\"Isto não saiu como deveria!\" disse ela");
alert("Esta linha tem uma tabulação\taqui.");
  }
  
  public storeIP(){
    
    this.storage.create();
    this.storage.set('1', this.serverIP);
    this.Toast.presentToast('IP salvo com sucesso!');
    this.popover.dismiss();
    
  }
  

  public login() {
    if(this.loginUserName==''||this.loginPassword==''){
      this.Toast.presentToast('Não esqueça de digitar seu usuário e senha!')}    
    else {
      if(this.serverIP==''){
        this.Toast.presentToast('Você deve primeiramente informar o IP do servidor!')}
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