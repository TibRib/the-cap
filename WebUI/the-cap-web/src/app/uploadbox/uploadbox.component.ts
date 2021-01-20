import { Component, EventEmitter, OnInit } from '@angular/core';
import { GCS_StorageService } from '../cloud-storage-services/gcs-storage.service';
import { HttpClient } from '@angular/common/http';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

const NEXT_VIEW = '/comparison'

@Component({
  selector: 'app-uploadbox',
  templateUrl: 'uploadbox.component.html',
  styleUrls: ['uploader.css']
})

export class UploadboxComponent implements OnInit {
 url = '/uploadAPI/upload';
 formData: FormData;
 files: UploadFile[];
 uploadInput: EventEmitter<UploadInput>;
 humanizeBytes: Function;
 dragOver: boolean;
 options: UploaderOptions;

 constructor(public authService: AuthService, private router: Router) {
   //Max filesize set to 50.0 MB
   this.options = { concurrency: 1, maxUploads: 3, maxFileSize: 50000000 };
   this.files = [];
   this.uploadInput = new EventEmitter<UploadInput>();
   this.humanizeBytes = humanizeBytes;
 }

 onUploadOutput(output: UploadOutput): void {
   if (output.type === 'allAddedToQueue') {
     const event: UploadInput = {
       type: 'uploadAll',
       url: this.url,
       method: 'POST',
       data: { foo: 'bar' }
     };

     this.uploadInput.emit(event);
   } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
     this.files.push(output.file);
   } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
     const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
     this.files[index] = output.file;
   } else if (output.type === 'cancelled' || output.type === 'removed') {
     this.files = this.files.filter((file: UploadFile) => file !== output.file);
   } else if (output.type === 'dragOver') {
     this.dragOver = true;
   } else if (output.type === 'dragOut') {
     this.dragOver = false;
   } else if (output.type === 'drop') {
     this.dragOver = false;
   } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
     alert("File '"+output.file.name+"' rejected ! (too large)")
     console.log(output.file.name + ' rejected');
     console.log(output.file.size + " MB.")
   } else if(output.type === "done"){
     console.log(output)
     if(output.file){
      if(output.file.responseStatus === 200){
        alert("Successfully transmitted file : "+output.file.response)
        this.authService.firebaseAuth.user.subscribe((user) => {
          this.authService.updateVideoURL(output.file.response, user.uid);
        });
        this.nextView()
      }else{
        alert("Echec : Status : "+output.file.responseStatus+" - "+output.file.response)
        if(output.file.responseStatus === 504 || output.file.responseStatus === 0 ){
          alert("This error occurs if you haven't started the GCS upload NodeJS server; Make sure to start it !")
        }
      }
    }
   }

   this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
 }

 startUpload(): void {
   const event: UploadInput = {
     type: 'uploadAll',
     url: this.url,
     method: 'POST',
     data: { foo: 'bar' }
   };

   this.uploadInput.emit(event);
 }

 cancelUpload(id: string): void {
   this.uploadInput.emit({ type: 'cancel', id: id });
 }

 removeFile(id: string): void {
   this.uploadInput.emit({ type: 'remove', id: id });
 }

 removeAllFiles(): void {
   this.uploadInput.emit({ type: 'removeAll' });
 }

 //Makes sure the user is authentified
 ngOnInit(): void {
    if (!this.authService.isLoggedIn){
      this.router.navigate(['/login']);
    }
  }

  //Redirection to a page - To change
  nextView() : void{
    this.router.navigate([NEXT_VIEW]);
  }

}
