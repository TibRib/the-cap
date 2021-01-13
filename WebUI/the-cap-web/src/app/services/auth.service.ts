import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import { User } from './user.model'
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  isLoggedIn = false;
  afs: AngularFirestore;

  constructor(public firebaseAuth: AngularFireAuth) { }
  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }
  async signup(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  // tslint:disable-next-line:typedef
  async GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  // tslint:disable-next-line:typedef
  AuthLogin(provider) {
    return this.firebaseAuth.signInWithPopup(provider)
      .then((result) => {
        this.isLoggedIn = true;
        console.log(this.isLoggedIn);
        console.log('You have been successfully logged in!');
      }).catch((error) => {
        console.log(error);
      });
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
