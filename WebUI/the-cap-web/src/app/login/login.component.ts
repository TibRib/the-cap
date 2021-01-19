import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../services/user.model';
import {Router} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSignedIn = false;
  userLoggedIn: User;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

  async onSignIn(email: string, password: string){
    await this.authService.signin(email, password)
    .then((result) => {
      if (this.authService.isLoggedIn){
        this.isSignedIn = true;
        this.authService.firebaseAuth.user.subscribe((user => {
          this.userLoggedIn = {displayName: user.displayName, email: user.email, uid: user.uid};
        }));
        this.router.navigate(['/form']);
      }
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
