import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  navItems = ["Use CAP", "About CAP", "Our story", "Contact"]
  constructor() {


  }

  ngOnInit(): void {
  }

}
