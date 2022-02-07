import { LoginPage } from './../login/login.page';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = null;
 
  constructor(
    private route: Router,
    private auth: AuthService
    ) {}
 
  ionViewWillEnter() {
    this.user = this.auth.getUser();
  }
 
  logout() {
    this.route.navigate(['/login'])
  }
}