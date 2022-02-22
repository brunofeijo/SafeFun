import { LoginPage } from './../login/login.page';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [BluetoothSerial]
})
export class HomePage {
    public tags: Array<any> = []
 
  constructor(

    public route: Router,
    public bluetooth: BluetoothSerial,
    public auth: AuthService,

    ) { }

    public logout() {
      this.auth.logout();
    }

    public startInvetorying(){
      this.bluetooth.subscribe('.iv').subscribe(
        data => {
         this.tags = data;
         console.log(data);       
        }
      );
      console.log();
    } 
 
    
    









}