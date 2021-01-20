import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import {TtsService} from "../services/tts.service";
import {Decode64Service} from "../live-data-services/decode64.service";

const NEXT_VIEW = '/upload'

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {
  user: firebase.User;
  options = [
    { value : '', label: ''},
    { value: '1', label: 'Tennis' },
  ];

  @Output() isLogut = new EventEmitter<void>();

  constructor(public authService: AuthService, private router: Router) {
    authService.firebaseAuth.user.subscribe((user) => {
      this.user = user;
    });
    
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn){
      this.router.navigate(['/login']);
    }
  }

  logout(){
    this.authService.logout();
    this.isLogut.emit();
  }

  //Redirection to a page - To change
  nextView() : void{
    this.router.navigate([NEXT_VIEW]);
  }

}
