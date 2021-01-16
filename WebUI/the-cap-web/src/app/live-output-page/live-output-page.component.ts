import { Component, OnInit } from '@angular/core';
import { ObjectObserverQueryService } from '../live-data-services/object-observer-query.service';
import { VisualInterpreterQueryService } from '../live-data-services/visual-interpreter-query.service';

@Component({
  selector: 'app-live-output-page',
  templateUrl: './live-output-page.component.html',
  styleUrls: ['./live-output-page.component.css']
})
export class LiveOutputPageComponent implements OnInit {
  videoUrl : string = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
  objo_stream_http : string = "http://172.19.240.1:7000";

  botMessages = [ "Hello", "Lorem ipsum", "this player is good"];

  constructor(private vi_api : VisualInterpreterQueryService, private objo_api : ObjectObserverQueryService) {
   }

  ngOnInit(): void {
  }

  addMessage(): void{
    this.vi_api.getResponse().subscribe( r => {
      this.botMessages.push(r.text);
      });
    //this.botMessages.push("Message "+ this.botMessages.length);
  }

  //Sends to the visualAPI the url of the 
  sendVIPost(): void{
    this.vi_api.postURL(this.objo_stream_http)
  }

  sendOBJOPost(): void{
    this.objo_api.postURL(this.videoUrl)
  }

}
