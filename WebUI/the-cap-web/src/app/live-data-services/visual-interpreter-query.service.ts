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
    this.http.get<VisualInterpreterResponse>("/visualAPI/results").subscribe( r => {
      if(r){ obs.next(r)};
    })

    return obs.asObservable();
  }

  postURL(u : string) : Observable<boolean>{
    console.log("CALLED")
    let success : Subject<boolean> = new Subject<boolean>()
    let to_send : VisualInterpreterRequest = { media_url : u}
    this.http.post("/visualAPI", to_send).subscribe( r => {
      console.log("VI POST response : "+r);
      success.next(true)
    }, error => {
      console.log(error)
      if(error.status == 200){
        success.next(true)
      }else{
        success.next(false)
      }
    });
    return success.asObservable()
  }
}
