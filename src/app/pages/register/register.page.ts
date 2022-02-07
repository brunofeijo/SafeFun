import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public username: string; 
  public password: string;

  constructor(
    public http: HttpClient,
  ) { }

  ngOnInit() {
  }

  public registerNewUser(){

    let postData =  {
      username: this.username,
      password: this.password,
      extra: "teste"
  }
   
     this.http.post("http://localhost:3001/users", postData,{observe: 'response'})
       .subscribe(data => {
         console.log(data);
        
        }, error => {
         console.log(error);
       });
  }

  

}
