import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectObserverRequest } from '../interfaces/ObjectObserverRequest';

@Injectable({
  providedIn: 'root'
})
export class ObjectObserverQueryService {
  
  constructor(private http : HttpClient) { }

  /*
  getResponse() : Observable<ObjectObserverResponse>{
    let obs : Subject<ObjectObserverResponse> = new Subject<ObjectObserverResponse>();
    this.http.get<ObjectObserverResponse>("/visualAPI").subscribe( r => {
      console.log("OBJ_OBSERVER received : "+r);
      obs.next({ text:r["text"] } );
    })

    return obs.asObservable();
  }
  */

  postURL(u : string) : void{
    let to_send : ObjectObserverRequest = { media_url : u}
    this.http.post("/observerAPI", to_send).subscribe( r => {
      console.log("OBJ. OBSERVER POST response : "+r);
    })
  }
}
