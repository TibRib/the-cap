import { Component, EventEmitter, OnInit } from '@angular/core';
import { GCS_StorageService } from '../cloud-storage-services/gcs-storage.service';
import { HttpClient } from '@angular/common/http';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { AuthService } from '../services/auth.service';

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

 constructor(public authService: AuthService) {
   //Max filesize set to 5.0 MB
   this.options = { concurrency: 1, maxUploads: 3, maxFileSize: 1000000 };
   this.files = [];
   this.uploadInput = new EventEmitter<UploadInput>();
   this.humanizeBytes = humanizeBytes;
 }
  ngOnInit(): void {
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
   } else if(output.type === "done"){
     console.log(output)
     if(output.file){
      if(output.file.responseStatus === 200){
        alert("Fichier transmis avec succès : "+output.file.response)
        this.authService.firebaseAuth.user.subscribe((user) => {
          this.authService.updateVideoURL(output.file.response, user.uid);
        });
      }else{
        alert("Echec : Status : "+output.file.responseStatus+" - "+output.file.response)
        if(output.file.responseStatus === 504){
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

}
