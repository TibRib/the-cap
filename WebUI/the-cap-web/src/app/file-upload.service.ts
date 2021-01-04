import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  endpoint = 'destination'

  constructor(private httpClient : HttpClient) { }

  UploadHeader() : HttpHeaders{
      let ts = String(Date.now());
      return new HttpHeaders() 
        .set('a', '1')
        .set('b', '2')
        .set('timestamp', ts);
    }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = this.endpoint;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    const headers = this.UploadHeader();
    return this.httpClient
      .post(endpoint, formData, { headers }).pipe(
      map(() => { return true; }),
      catch(e => this.handleError(e))
      );
  }
  handleError(e: any) {
    throw new Error('Method not implemented.');
  }
}
