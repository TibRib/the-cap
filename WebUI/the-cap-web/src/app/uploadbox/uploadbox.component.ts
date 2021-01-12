import { Component, OnInit } from '@angular/core';
import { GCS_StorageService } from '../cloud-storage-services/gcs-storage.service';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-uploadbox',
  template: `

<div style="text-align: center">
  <form>      
    <div>
      <input type="file" name="image" (change)="selectFile($event)" />
    </div>
    <br>
    <div>
      <button type="submit" (click)="onSubmit()">Upload</button>
    </div>
  </form>
</div>

  
  `,
  styles: [``]
})


export class UploadboxComponent implements OnInit {
  
  images;

  constructor(private httpClient : HttpClient) {  }


  selectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  //TODO : get back file in browser (for now it just refreshes due to the submit action)
  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.httpClient.post<any>("/uploadAPI/upload", formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {}

}
