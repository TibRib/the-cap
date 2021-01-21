import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Decode64Service {

  constructor() { }

  decodeAndPlay(base64string : String, volume : number){
    var snd = new Audio("data:audio/wav;base64," + base64string);
    snd.volume = Math.min(1.0,volume)
    snd.play();
  }
}
