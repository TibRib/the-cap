import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GCS_StorageService {
  SERVER_URL = 'destination';
  bucketName = "";
  
  

  constructor(private httpClient : HttpClient) {
   }

   



}
