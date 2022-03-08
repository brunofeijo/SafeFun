import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-local-register',
  templateUrl: './local-register.page.html',
  styleUrls: ['./local-register.page.scss'],
})
export class LocalRegisterPage implements OnInit {

  public locations: any = [];

  constructor(
    public auth: AuthService,
    public http: HttpClient,

  ) { this.getLocation(); }

  ngOnInit() {
  }

  public getLocation(){

    this.http.post("http://192.168.200.245/cld-core/ativos-mobile/localizacao", this.locations).subscribe(
      data => {
        console.log(this.locations);
        this.locations = data;
       
       
      }, error => {
        console.log(error);
      });
  
  }

  public logout() {
    this.auth.logout();
  }



}
