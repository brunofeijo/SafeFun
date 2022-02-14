import { HomePage } from './../home/home.page';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  public loginUserName: string;
  public loginPassword: string;
  public serverIP: string;
  
  constructor(
    private auth: AuthService,
  ) {}
 
  ngOnInit() {}  

  public login() {
    this.auth.login(this.loginUserName, this.loginPassword, this.serverIP);
  }
}