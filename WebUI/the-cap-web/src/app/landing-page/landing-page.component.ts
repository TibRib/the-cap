import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  template: `
    <h1>Welcome ! </h1>
    <app-video-player videoSource="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"></app-video-player>
  `,
  styles: []
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
