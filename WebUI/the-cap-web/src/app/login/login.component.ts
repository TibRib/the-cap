import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSignedIn = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

  async onSignUp(email: string, password: string){
    await this.authService.signup(email, password);
    if (this.authService.isLoggedIn){
      this.isSignedIn = true;
    }
  }

  async onSignIn(email: string, password: string){
    await this.authService.signin(email, password);
    if (this.authService.isLoggedIn){
      this.isSignedIn = true;
    }
  }

  async onGoogleSignIn(){
    await this.authService.GoogleAuth();
    if (this.authService.isLoggedIn){
      this.isSignedIn = true;
    }
  }

  handleLogout(){
    this.isSignedIn = false;
  }


}
