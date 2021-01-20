import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  ),
  responseType: 'text'
};

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor(private http: HttpClient) { }

  getAudioFile(textToSpeech: string){
    return this.http.get('/ttsAPI/' + btoa(textToSpeech));
  }
}
