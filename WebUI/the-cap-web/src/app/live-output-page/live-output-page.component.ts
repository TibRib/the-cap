import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VisualInterpreterQueryService } from '../live-data-services/visual-interpreter-query.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';

import { timer } from 'rxjs';

@Component({
  selector: 'app-live-output-page',
  templateUrl: './live-output-page.component.html',
  styleUrls: ['./live-output-page.component.css']
})
export class LiveOutputPageComponent implements OnInit {
  videoUrl : string = "https://storage.googleapis.com/the-cap-bucket/tennis1.mp4";

  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;

  botMessages = [];

  constructor(private vi_api : VisualInterpreterQueryService) {
   }

  ngOnInit(): void {
  }

  addMessage(): void{
    this.vi_api.getResponse().subscribe( r => {
        for(var i=0; i<r.frames_processed; i++){
          this.botMessages.push(r.deductions[i].text);
        }
      });
  }

  requestAnswers() : void{
    //Query messages every 2 seconds
    const t1 = timer(0, 1000);
    t1.subscribe(x => this.addMessage());
  }

  //Sends to the visualAPI the url of the video
  sendVIPost(): void{
    this.vi_api.postURL(this.videoUrl)

    //Data is sent, let's listen for responses...
    const t2 = timer(5000);
    this.requestAnswers()
    t2.subscribe(x => this.videoPlayer.play());

  }

}
