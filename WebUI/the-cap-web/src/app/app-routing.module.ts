import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UploadboxComponent } from './uploadbox/uploadbox.component';

const routes: Routes = [
  { path : '', component: LandingPageComponent },
  { path : 'upload', component: UploadboxComponent },
  

  //Redirection home si non trouvé
  { path : '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

