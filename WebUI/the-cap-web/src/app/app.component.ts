import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <!-- barre de navigation -->
  <nav id="navbar" class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav">
          <a class="nav-item nav-link" routerLink="/">Home</a>
          <a class="nav-item nav-link" routerLink="/upload">Upload</a>
          <a class="nav-item nav-link" routerLink="/form">Form</a>
          <a class="nav-item nav-link" routerLink="/login">Login</a>
          <a class="nav-item nav-link" routerLink="/live">Live</a>
          <a class="nav-item nav-link" routerLink="/comparison">Comparison</a>
      </div>
  </nav>
  <!-- contenu dans un container -->
  <div class="jumbotron min-vh-100">
      <div class="container">
          <router-outlet></router-outlet>
      </div>
  </div>
  `,
styles: []
})
export class AppComponent {
  title = 'the-cap-web';
}
