import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-output-page',
  templateUrl: './live-output-page.component.html',
  styleUrls: ['./live-output-page.component.css']
})
export class LiveOutputPageComponent implements OnInit {
  videoUrl : string = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";

  botMessages = [ "Hello", "Lorem ipsum", "this player is good"];

  constructor() {
   }

  ngOnInit(): void {
  }

  addMessage(): void{
    this.botMessages.push("Message "+ this.botMessages.length);
  }

}
