import { Component, EventEmitter, OnInit } from '@angular/core';
import { GCS_StorageService } from '../cloud-storage-services/gcs-storage.service';
import { HttpClient } from '@angular/common/http';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';

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

 constructor() {
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
