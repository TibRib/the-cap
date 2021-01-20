import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import {TtsService} from "../services/tts.service";
import {Decode64Service} from "../live-data-services/decode64.service";

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
  constructor(public authService: AuthService, private router: Router, private tts: TtsService, private decode: Decode64Service) {
    authService.firebaseAuth.user.subscribe((user) => {
      this.user = user;
      authService.updateVideoURL('http://test.fr', user.uid);
    });
    tts.getAudioFile('Sound Quality Test').subscribe((data) => {
      console.log(data);
    }, error => {
      decode.decodeAndPlay(error.error.text);
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

}
