import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @Input() autoplay : boolean = false;
  @Input() videoSource : string;
  playing : boolean = false

  @ViewChild('videoPlayer') 
  set mainVideoEl(el: ElementRef) {
    this.player = el.nativeElement;
    this.onPlayerReady()
  }
  player: HTMLVideoElement;

  constructor() { }

  ngOnInit(): void {
  }

  onPlayerReady(): void{
    console.log(this.player)
    this.player.volume = 0.25
    if(this.videoSource && this.autoplay===true)
      this.player.play()
  }

  onPause(): void{
    console.log("paused")
    this.playing = false;
  }

  onPlay(): void{
    console.log("playing")
    this.playing = true;
  }

}
