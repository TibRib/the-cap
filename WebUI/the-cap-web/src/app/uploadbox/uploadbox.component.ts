import { Component, OnInit } from '@angular/core';
import { GCS_StorageService } from '../cloud-storage-services/gcs-storage.service';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';

const URL = "test";

@Component({
  selector: 'app-uploadbox',
  template: `

<!--
<button type="button" class="btn btn-info" (click)="GetFileList()" >
  GetFileList
</button>
-->
<div class="row">

 <div class="col-md-3">

     <h3>Select files</h3>

     <div ng2FileDrop
          [ngClass]="{'nv-file-over': hasBaseDropZoneOver}"
          (fileOver)="fileOverBase($event)"
          [uploader]="uploader"
          class="well my-drop-zone">
         Base drop zone
     </div>

     Single
     <input type="file" ng2FileSelect [uploader]="uploader" />
 </div>

 <div class="col-md-9" style="margin-bottom: 40px">

     <h3>Upload queue</h3>
     <p>Queue length: {{ uploader?.queue?.length }}</p>

     <table class="table">
         <thead>
         <tr>
             <th width="50%">Name</th>
             <th>Size</th>
             <th>Progress</th>
             <th>Status</th>
             <th>Actions</th>
         </tr>
         </thead>
         <tbody>
         <tr *ngFor="let item of uploader.queue">
             <td><strong>{{ item?.file?.name }}</strong></td>
             <td *ngIf="uploader.options.isHTML5" nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>
             <td *ngIf="uploader.options.isHTML5">
                 <div class="progress" style="margin-bottom: 0;">
                     <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': item.progress + '%' }"></div>
                 </div>
             </td>
             <td class="text-center">
                 <span *ngIf="item.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>
                 <span *ngIf="item.isCancel"><i class="glyphicon glyphicon-ban-circle"></i></span>
                 <span *ngIf="item.isError"><i class="glyphicon glyphicon-remove"></i></span>
             </td>
             <td nowrap>
                 <button type="button" class="btn btn-success btn-xs"
                         (click)="item.upload()" [disabled]="item.isReady || item.isUploading || item.isSuccess">
                     <span class="glyphicon glyphicon-upload"></span> Upload
                 </button>
                 <button type="button" class="btn btn-warning btn-xs"
                         (click)="item.cancel()" [disabled]="!item.isUploading">
                     <span class="glyphicon glyphicon-ban-circle"></span> Cancel
                 </button>
                 <button type="button" class="btn btn-danger btn-xs"
                         (click)="item.remove()">
                     <span class="glyphicon glyphicon-trash"></span> Remove
                 </button>
             </td>
         </tr>
         </tbody>
     </table>

     <div>
         <div>
             Queue progress:
             <div class="progress" style="">
                 <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': uploader.progress + '%' }"></div>
             </div>
         </div>
         <button type="button" class="btn btn-success btn-s"
                 (click)="uploader.uploadAll()" [disabled]="!uploader.getNotUploadedItems().length">
             <span class="glyphicon glyphicon-upload"></span> Upload all
         </button>
         <button type="button" class="btn btn-warning btn-s"
                 (click)="uploader.cancelAll()" [disabled]="!uploader.isUploading">
             <span class="glyphicon glyphicon-ban-circle"></span> Cancel all
         </button>
         <button type="button" class="btn btn-danger btn-s"
                 (click)="uploader.clearQueue()" [disabled]="!uploader.queue.length">
             <span class="glyphicon glyphicon-trash"></span> Remove all
         </button>
     </div>

 </div>

</div>

<br><br>

<div class="row">
 <div class="col-md-12">
     <div class="panel panel-default">
         <div class="panel-heading">Response</div>
         <div class="panel-body">
           {{ response }}
         </div>
     </div>
 </div>
</div>
-->

<div style="text-align: center">
  <form>      
    <div>
      <input type="file" name="image" (change)="selectImage($event)" />
    </div>
    <br>
    <div>
      <button type="submit" (click)="onSubmit()">Upload</button>
    </div>
  </form>
</div>

  
  `,
  styles: [`
    .my-drop-zone { border: dotted 3px lightgray; }
    .nv-file-over { border: dotted 3px red; } /* Default class applied to drop zones on over */
    .another-file-over-class { border: dotted 3px green; }
 
    html, body { height: 100%; }
  `]
})


export class UploadboxComponent implements OnInit {

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  
  images;

  constructor(private httpClient : HttpClient) { 
    this.uploader = new FileUploader({
      url: '/uploadAPI/file',
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });
 
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
 
    this.response = '';
 
    this.uploader.response.subscribe( res => this.response = res );
  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.httpClient.post<any>("/uploadAPI/file", formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public GetFileList():void{/*
    this.storageService.listObjects("the-cap-bucket").subscribe(r=>{
      console.log(r);
    }); */
  }

}
