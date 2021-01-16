import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { VisualInterpreterResponse } from '../interfaces/VisualInterpreterResponse';
import { VisualInterpreterRequest } from '../interfaces/VisualInterpreterRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisualInterpreterQueryService {

  constructor(private http : HttpClient) { }

  getResponse() : Observable<VisualInterpreterResponse>{
    let obs : Subject<VisualInterpreterResponse> = new Subject<VisualInterpreterResponse>();
    this.http.get<VisualInterpreterResponse>("/visualAPI").subscribe( r => {
      console.log("VI received : "+r);
      obs.next({ text:r["text"] } );
    })

    return obs.asObservable();
  }

  postURL(u : string) : void{
    let to_send : VisualInterpreterRequest = { url : u}
    this.http.post("/visualAPI", to_send).subscribe( r => {
      console.log("VI POST response : "+r);
    })
  }
}
