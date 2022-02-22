import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-register',
  templateUrl: './local-register.page.html',
  styleUrls: ['./local-register.page.scss'],
})
export class LocalRegisterPage implements OnInit {

  public locations: any;

  constructor(

    public http: HttpClient,

  ) { }

  ngOnInit() {
  }

  public getLocation(){
    let postData = {
      "id": 0,
      "localizacaoPaiId": 0,
      "nivelLocalizacaoId": 0,
      "nome": "string",
      "rfid": "string",
      "sigla": "string",
      "usuarios": [
        {
          "tipo": "LOTADO",
          "usuarioId": 0
        }
      ]
    } 
    this.http.post("http://192.168.200.245/cld-core/ativos-mobile/localizacao", postData, {}).subscribe(
      data => {
        this.locations = data;
        console.log(data);
       
      }, error => {
        console.log(error);
      });
  
  }
}
