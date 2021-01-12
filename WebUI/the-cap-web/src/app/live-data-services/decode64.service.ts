import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Decode64Service {

  constructor() { }

  decodeAndPlay(base64string : String){
    var snd = new Audio("data:audio/wav;base64," + base64string);
    snd.play();
  }
}
