import { Component, OnInit } from '@angular/core';
import {User} from '../services/user.model';
import {AuthService} from '../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isSignedIn = false;
  users: User[];

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

  async onSignUp(email: string, password: string, displayName: string){
    await this.authService.signup(email, password, displayName)
      .then((result) => {
        if (this.authService.isLoggedIn){
          this.isSignedIn = true;
          this.router.navigate(['form']);
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
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
