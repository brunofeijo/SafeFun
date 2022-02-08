import { LoginPage } from './../login/login.page';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public tags: Array<any>;
 
  constructor(
    private route: Router,
    private auth: AuthService,
    private subscription: Subscription,
    private bluetooth: BluetoothSerial,
    ) { }

    public logout() {
      this.route.navigate(['/login'])
   }
 
    public startInvetorying(){
      this.subscription = this.bluetooth.subscribe('.iv').subscribe(
       data => {
        this.tags = data;
        console.log(data);
        if(this.tags.includes('OK')){
         console.log('Teste'); 
         this.subscription.unsubscribe();
        }
       }
     );
     console.log();
   } 









}