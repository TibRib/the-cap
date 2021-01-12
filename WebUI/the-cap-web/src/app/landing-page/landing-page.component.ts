import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  template: `
    <h1>Welcome ! </h1>
    <div *ngFor="let number of numbers" class="col-md-4">
    <!--Card-->
    <mdb-card cascade="true" wider="true" reverse="true" class="my-4">
  <!--Card image-->
  <div class="view view-cascade overlay waves-light" mdbWavesEffect>
    <mdb-card-img src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"></mdb-card-img>
    <a>
      <div class="mask rgba-white-slight"></div>
    </a>
  </div>
  <!--/Card image-->

  <!-- Card content -->
  <mdb-card-body cascade="true" class="text-center">

    <!--Title-->
    <mdb-card-title>
      <h4>
        <strong>My adventure</strong>
      </h4>
    </mdb-card-title>

    <h5 class="indigo-text">
      <strong>Photography</strong>
    </h5>

    <mdb-card-text>
      Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudantium, totam rem
      aperiam.
    </mdb-card-text>

    <!--Linkedin-->
    <a class="px-2 icons-sm li-ic">
      <mdb-icon fab icon="linkedin-in"> </mdb-icon>
    </a>
    <!--Twitter-->
    <a class="px-2 icons-sm tw-ic">
      <mdb-icon fab icon="twitter"> </mdb-icon>
    </a>
    <!--Dribbble-->
    <a class="px-2 icons-sm fb-ic">
      <mdb-icon fab icon="facebook-f"> </mdb-icon>
    </a>
  </mdb-card-body>

</mdb-card>
    <!--/.Card-->
  </div>

  `,
  styles: []
})

export class LandingPageComponent implements OnInit {
  numbers = [1,2,3,4,5,6,7,8]
  constructor() {}

  ngOnInit(): void {
  }

}
