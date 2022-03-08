import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { __values } from 'tslib';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  providers: [BluetoothSerial],
})
export class inventoryPage {
    public tags: Array<any> = [1,2,3,4,5]
    public userConnected: boolean = false;
    public locations: any;
    public teste: Array<any>;
 
  constructor(
    public http: HttpClient,
    public bluetooth: BluetoothSerial,
    public auth: AuthService,
    
   
    ) { this.getLocation(); }

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
    
    public getLocation(){
      this.http.post("http://192.168.200.245/cld-core/ativos-mobile/localizacao", this.locations).subscribe(
        data => {
          this.locations = Object.values(data);
        }, error => {
          console.log(error);
        });    
    }

    
    




}