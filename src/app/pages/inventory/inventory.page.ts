/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { ConfigPage } from './../config/config.page';
import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageBoxService } from 'src/app/util/message-box.service';



@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  providers: [BluetoothSerial, Storage, ConfigPage],
})
export class inventoryPage {
    public RFID: any;
    public serverIP = environment.serverIP;
    public allTags: Array<string>;
    public tags: Array<string> = ['Toalha de Rosto', 'Macacão verde', 'Lençol', 'Uniforme centro cirúrgico', 'Capote avental Cirúrgico'];
    public rawTags: any;
    public userConnected = false;
    public locations: any;
    public originPlace = 'Origem';
    public destinationPlace = 'Destino';
    public ativosBody: any = {
      baixado: true,
      id: 0,
      identificador: 0,
      localizacaoAtualId: 0,
      numeroDeSerie: 'string',
      responsavelAtualId: 0,
      rfid: 'string',
      valorAtual: 0
    };

  constructor(
    public http: HttpClient,
    public bluetooth: BluetoothSerial,
    public auth: AuthService,
    public zone: NgZone,
    public storage: Storage,
    public route: Router,
    public configPage: ConfigPage,
    public msg: MessageBoxService,


    ) {
      this.storage.create();
        this.getLocation();
        this.startInvetorying();
        this.allTags = this.tags;
      }

    public logout() {
      this.auth.logout();
    }

    public searchTags(event){
      this.RFID = event.detail.value;
      this.allTags = this.tags;
      console.log(this.RFID);
      if(this.RFID && this.RFID.trim() !== ''){
        this.allTags = this.allTags.filter((tag: string)=>(tag.toLowerCase().indexOf(this.RFID.toLowerCase()) > -1 ));
      }
    }

    public startInvetorying(){
      this.bluetooth.subscribe('.iv').subscribe(
        data => {
          this.rawTags = data;
          this.tags = this.rawTags.split(' ');
          this.zone.run(()=>{
            this.tags;
          });
        }
      );
    }

    public getLocation(){
      this.http.post(`${this.serverIP}/ativos-mobile/localizacao`, this.locations).subscribe(
        data => {
          this.storage.set('2', data).then(
            loc =>{
              console.log(loc);
            }
          );
     }, error => {
          console.log(error);
        });
        this.storage.get('2').then(
          local =>{
            this.locations = local;
            console.log(local);
          }
        );
    }


    public moveMaterial() {
      if(this.originPlace === this.destinationPlace){
         this.msg.presentAlert('A origem e o destino do ativo não podem ser a mesma!');
      }else{
        this.http.post(this.serverIP, this.ativosBody,{
          headers: {
            'access-control-allow-origin': '*',
            'access-control-allow-methods': 'PUT',
            authorization: '"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJBRE0iLCJpc3MiOiJodHRwOi8vY2xkLWNvcmUvIiwiaWF0IjoxNjQ2NzY5MTQ3LCJleHAiOjE2NDY3NzY1NDd9.yLrVK7C_RZnkFuZFo9Dsbhqd5YoOJ1MgpTIuhl54bZs"',
          }
       }).subscribe(
          data => {
            console.log(data);
          }
        );
      }
    }






}
