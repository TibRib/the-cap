import { Component, OnInit } from '@angular/core';
import { VisualInterpreterQueryService } from '../live-data-services/visual-interpreter-query.service';

@Component({
  selector: 'app-live-output-page',
  templateUrl: './live-output-page.component.html',
  styleUrls: ['./live-output-page.component.css']
})
export class LiveOutputPageComponent implements OnInit {
  videoUrl : string = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";

  botMessages = [ "Hello", "Lorem ipsum", "this player is good"];

  constructor(private vi_api : VisualInterpreterQueryService) {
   }

  ngOnInit(): void {
  }

  addMessage(): void{
    this.vi_api.getResponse().subscribe( r => {
      this.botMessages.push(r.text);
      });
    //this.botMessages.push("Message "+ this.botMessages.length);
  }

  sendStreamRequest(): void{
    this.vi_api.postURL()
  }

}
