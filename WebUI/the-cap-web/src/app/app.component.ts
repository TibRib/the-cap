import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <!-- barre de navigation -->
  <mdb-navbar SideClass="navbar navbar-expand-lg navbar-dark bg-dark">
    <mdb-navbar-brand>
    <img height="40" src="assets/img/THE_CAP_icon_round_flat.png">
    </mdb-navbar-brand>
    <links>
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-item nav-link" routerLink="/" mdbWavesEffect>Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-item nav-link" routerLink="/upload" mdbWavesEffect>Upload <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-item nav-link"  mdbWavesEffect>Pricing <span class="sr-only">(current)</span></a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link disabled" >Disabled</a>
            </li> -->
        </ul>
    </links>
</mdb-navbar>
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
