import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VisualInterpreterQueryService } from '../live-data-services/visual-interpreter-query.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';

import { timer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-output-page',
  templateUrl: './live-output-page.component.html',
  styleUrls: ['./live-output-page.component.css']
})
export class LiveOutputPageComponent implements OnInit, OnDestroy {
  videoUrl : string = "";
  tries : number = 0;

  private answersSubscription;

  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;

  botMessages = [];

  constructor(private vi_api : VisualInterpreterQueryService,
              public authService: AuthService,
              private router: Router) {
   }


  ngOnInit(): void {
    if (!this.authService.isLoggedIn){
      this.router.navigate(['/login']);
    }else{
      this.authService.firebaseAuth.user.subscribe((user) => {
        this.authService.retrieveVideoURL(user.uid).subscribe(url =>{
          this.videoUrl = url
          this.videoPlayer.videoSource = url
        })

      });
    }
  }

  addMessage(): void{
    this.vi_api.getResponse().subscribe( r => {
        for(var i=0; i<r.frames_processed; i++){
          if(r.deductions.length > 0){
            this.botMessages.push(r.deductions[i].text);
          }
        }
      });
  }

  requestAnswers() : void{
    //Query messages every 2 seconds
    this.answersSubscription = timer(1000, 1000).subscribe(seconds =>{
        this.vi_api.getResponse().subscribe( r => {
          if(r){
            for(var i=0; i<r.frames_processed; i++){
                if(r.deductions.length > 0){
                  if(this.botMessages.length == 0 ){
                    this.videoPlayer.play();
                  }
                  if(r.deductions[i]){
                    let sec = r.deductions[i].frame_id / 25.0
                    this.botMessages.push(sec+"s : "+r.deductions[i].text);
                  }
                }
            }
        }else{
          if(this.botMessages.length < 1 ){
            if(this.tries < 16){
              this.tries++;
              console.log("Tries : "+this.tries);
            }else{
              alert("No response after 16 tries, make sure the VisualInterpreter server is launched and accessible");
              this.unrequestAnswers()
  
            }
          }else{
            console.log(this.botMessages.length)
            console.log("No more frame to be analyzed, unsubscribing !")
            this.unrequestAnswers()
          }
        }
      });
        
    });
  }

  unrequestAnswers(): void {
    if(this.answersSubscription){
      this.answersSubscription.unsubscribe()
    }
  }

  //Sends to the visualAPI the url of the video
  sendVIPost(): void{
    this.botMessages = [];
    this.vi_api.postURL(this.videoUrl)

    //Data is sent, let's listen for responses...
    this.requestAnswers()

  }
  
  ngOnDestroy(): void {
    this.unrequestAnswers()
  }

}
