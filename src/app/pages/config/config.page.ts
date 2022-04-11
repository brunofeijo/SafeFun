import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { LoaderBoxService } from 'src/app/util/loader-box.service';
import { MessageBoxService } from 'src/app/util/message-box.service';
import { ToastBoxService } from 'src/app/util/toast-box.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  providers: [BluetoothSerial]
})
export class ConfigPage implements OnInit {

    public deviceIsConnected = false;
    public devices: Array<any> = [];

  constructor(

    public bluetooth: BluetoothSerial,
    public msgBox: MessageBoxService,
    public loadingBox: LoaderBoxService,
    public toastBox: ToastBoxService,

  ) { }

  ngOnInit() {
  }

  public checkBluetothIsEnabled() {
    this.bluetooth.isEnabled().then(
      data => {
        if(this.deviceIsConnected===true){
          this.clearDevices();
          this.msgBox.presentAlert('Dispositivo já conectado');
        }
        else{this.searchDevices();
        }
      },
      error => {
        console.log(error);
        this.bluetooth.enable().then(
          data => {
            console.log('Ligando Bluetooth');
          }
        );
      }
    );
  }

  public clearDevices(){
    this.devices = [];
  }

  public searchDevices(){
    this.bluetooth.list().then(
      data => {
        this.devices = data;
      }
    );
    this.bluetooth.discoverUnpaired().then(
      data => {
        console.log(data);
        this.devices = data;
      },
      error => {
      console.log(error);
      }
    );
  }

  public connectDevice(device){
    console.log(device);
    this.loadingBox.presentLoading('Conectando dispositivo...');
    this.bluetooth.connect(device).subscribe(
      data => {
        this.loadingBox.loadingController.dismiss('Conectando dispositivo...');
        if (this.deviceIsConnected===true) {
          this.clearDevices();
        }
        this.toastBox.presentToast('Dispositivo conectado!');
      },
    error => {
      console.log(error);
      this.toastBox.presentToast('Erro ao conectar dispositivo');
      this.loadingBox.loadingController.dismiss('Conectando dispositivo...');
      }
    );
  }

  public disconnectDevice() {
    this.bluetooth.disconnect().then(
      data => {
        console.log(data);
        this.deviceIsConnected = false;
        this.toastBox.presentToast('Dispositivo desconectado.');
      },
      error => {
        console.log(error);
      }
    );
  }

}
