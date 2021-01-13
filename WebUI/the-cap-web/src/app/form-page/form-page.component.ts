import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {

  displayForm = 0;

  options = [
    { value : '', label: ''},
    { value: '1', label: 'Tennis' },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
