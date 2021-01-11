import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-uploadbox',
  template: `
    <h1>uploadbox works!</h1>
    <div class="form-group">
        <label for="file">Choose File</label>
        <input type="file"
              id="file"
              (change)="handleFileInput($event.target.files)">
    </div>
  `,
  styles: []
})
export class UploadboxComponent implements OnInit {
  fileToUpload: File = null;

  constructor(/* private fileUploadService:FileUploadService */) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    //this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    /*
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
      */
    }
  

}
