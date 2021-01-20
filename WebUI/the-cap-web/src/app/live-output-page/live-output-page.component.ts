import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VisualInterpreterQueryService } from '../live-data-services/visual-interpreter-query.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';

import { timer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Decode64Service } from '../live-data-services/decode64.service';
import { TtsService } from '../services/tts.service';

@Component({
  selector: 'app-live-output-page',
  templateUrl: './live-output-page.component.html',
  styleUrls: ['./live-output-page.component.css']
})
export class LiveOutputPageComponent implements OnInit, OnDestroy {
  videoUrl : string = "";
  tries : number = 0;

  audioCommentaries = false
  loadLabelVisible = false
  errorLoading = false
  errorLabel = ""

  private answersSubscription;

  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;

  botMessages = [];

  constructor(private vi_api : VisualInterpreterQueryService,
              public authService: AuthService,
              private router: Router,
              private tts: TtsService,
              private decoder: Decode64Service) {
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
                  if(r.deductions[i]){
                    if(this.botMessages.length == 0 && r.deductions[i].text){
                      this.loadLabelVisible = false
                      this.videoPlayer.play();
                    }
                    let sec = r.deductions[i].frame_id / 25.0
                    this.botMessages.push(sec+"s : "+r.deductions[i].text);
                    if(this.audioCommentaries == true){
                      this.commentAudio(r.deductions[i].text)
                    }
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
              this.errorLabel = "Server not accessible after 16 tries"
              this.errorLoading = true
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
    this.loadLabelVisible = true
    this.botMessages = [];
    let s = this.vi_api.postURL(this.videoUrl).subscribe(success =>{
      if(success == false){
        this.errorLabel = "Failed in Sending a Visual Interpreter Request : incorrect media url provided or Server not running"
        this.errorLoading = true
        this.loadLabelVisible = false
        s.unsubscribe()
        this.unrequestAnswers()
      }
    })

    //Data is sent, let's listen for responses...
    this.requestAnswers()

  }
  
  ngOnDestroy(): void {
    this.unrequestAnswers()
  }

  commentAudio(text : string) : void{
    this.tts.getAudioFile(text).subscribe((data) => {
        console.log(data);
      }, error => {
        this.decoder.decodeAndPlay(error.error.text);
      });
  }

}
