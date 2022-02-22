import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-material-register',
  templateUrl: './material-register.page.html',
  styleUrls: ['./material-register.page.scss'],
})
export class MaterialRegisterPage implements OnInit {

  constructor(

    public auth: AuthService
    
  ) { }

  ngOnInit() {
  }

  public logout() {
    this.auth.logout();
  }

}
