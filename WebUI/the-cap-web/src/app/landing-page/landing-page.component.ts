import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styles: []
})

export class LandingPageComponent implements OnInit {
  numbers = [1, 2, 3, 4, 5, 6, 7, 8]
  constructor() { }

  ngOnInit(): void {
  }

}
