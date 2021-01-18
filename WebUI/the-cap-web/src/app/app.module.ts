import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { UploadboxComponent } from './uploadbox/uploadbox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FileUploadModule } from 'ng2-file-upload';
import { FormPageComponent } from './form-page/form-page.component';
import { LoginComponent } from './login/login.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthService} from './services/auth.service';
import { NgxUploaderModule } from 'ngx-uploader';
import { LiveOutputPageComponent } from './live-output-page/live-output-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    VideoPlayerComponent,
    UploadboxComponent,
    FormPageComponent,
    LoginComponent,
    LiveOutputPageComponent
  ],
  imports: [
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FileUploadModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxUploaderModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
