import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {

  options = [
    { value : '', label: ''},
    { value: '1', label: 'Tennis' },
  ];

  @Output() isLogut = new EventEmitter<void>();
  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.isLogut.emit();
    this.router.navigate(['login']);
  }

}
