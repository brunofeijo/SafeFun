/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
import { LoginPage } from './../login/login.page';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { ConfigPage } from '../config/config.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [BluetoothSerial, ConfigPage]
})
export class HomePage implements OnInit {
    public tags: Array<any> = []

  constructor(

    public route: Router,
    public bluetooth: BluetoothSerial,
    public auth: AuthService,
    public config: ConfigPage,

    ) { }

    ngOnInit() {

    }

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
