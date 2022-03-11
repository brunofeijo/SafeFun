import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  providers: [BluetoothSerial],
})
export class inventoryPage {
    public tags: Array<string>;
    public rawTags: any;
    public userConnected: boolean = false;
    public locations: any;
    public originLocal: string = "Origem";
    public destinationLocal: string = "Destino";
 
  constructor(
    public http: HttpClient,
    public bluetooth: BluetoothSerial,
    public auth: AuthService,
    public zone: NgZone,
    
   
    ) { 
        this.getLocation();
        this.startInvetorying();
      }

    public logout() {
      this.auth.logout();
    }

    public startInvetorying(){
      this.bluetooth.subscribe('.iv').subscribe(
        data => {
          this.rawTags = data;
          console.log(this.rawTags);
          this.tags = this.rawTags.split(" ");
          this.zone.run(()=>{
            this.tags;
          })
          console.log(this.tags);        
        }
      );
    } 
    
    public getLocation(){
      this.http.post("http://192.168.200.245/cld-core/ativos-mobile/localizacao", this.locations).subscribe(
        data => {
          this.locations = Object.values(data);
     }, error => {
        });    
    }

    public locationChange($event) {
      console.log($event.target.value) ;
  }

    public moveMaterial() {
      console.log("to aqui")
      console.log(this.originLocal, this.destinationLocal)
      if(this.originLocal == this.destinationLocal){
        alert("A origem e o destino do ativo não podem ser a mesma!")
      }else{
        alert("deu certo!")
      }
    }
    
    




}