import { Component, OnInit } from '@angular/core';
import { VisualInterpreterQueryService } from '../live-data-services/visual-interpreter-query.service';

@Component({
  selector: 'app-live-output-page',
  templateUrl: './live-output-page.component.html',
  styleUrls: ['./live-output-page.component.css']
})
export class LiveOutputPageComponent implements OnInit {
  videoUrl : string = "https://storage.googleapis.com/the-cap-bucket/tennis1.mp4";

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

  //Sends to the visualAPI the url of the video
  sendVIPost(): void{
    this.vi_api.postURL(this.videoUrl)
  }

}
