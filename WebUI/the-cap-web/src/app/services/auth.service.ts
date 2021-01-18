import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import { User } from './user.model';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  userCollection: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  uid = 'tTx3L9RQUjXz00DZtr7rbYH0fl32';

  constructor(public firebaseAuth: AngularFireAuth, private firestore: AngularFirestore, public afs: AngularFirestore) {
    this.users = this.afs.collection('user', ref => ref.where('uid', '==', this.uid)).valueChanges();
  }

  getUsers(){
    return this.users;
  }
  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }
  async signup(email: string, password: string, username: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        return this.firestore.collection('user').doc(res.user.uid).set({
          uid: res.user.uid,
          email: res.user.email,
          displayName: username,
          video_url: 'http://youtube.fr/'
        });
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
      .then((res) => {
        this.isLoggedIn = true;
        return this.firestore.collection('user').doc(res.user.uid).set({
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          video_url: 'http://youtube.fr/'
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
