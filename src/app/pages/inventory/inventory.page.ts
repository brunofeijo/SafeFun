import { LoginPage } from './../login/login.page';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  providers: [BluetoothSerial],
})
export class inventoryPage {
    public tags: Array<any> = []
 
  constructor(

    public route: Router,
    public bluetooth: BluetoothSerial

    ) { }

    public logout() {
      this.route.navigate(['/login'])
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