import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import { User } from './user.model';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(public firebaseAuth: AngularFireAuth, private firestore: AngularFirestore, public afs: AngularFirestore) {}

  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch(error => window.alert('Unknown user'));
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

  async GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

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

  updateVideoURL(url: string, uid: string){
    return this.firestore.collection('user').doc(uid).set({video_url: url}, {merge: true});
  }

  retrieveVideoURL(uid: string) : Observable<string>{
    let str : Subject<string> = new Subject<string>();
    this.firestore.collection('user').doc(uid).get().subscribe(r =>{
      interface VUser {
        uid: string;
        email: string;
        displayName: string;
        video_url: string
      }
      const data = <VUser>r.data()
      console.log(data.video_url)
      str.next(data.video_url)
    });
    
   return str.asObservable()
  }
  
  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
