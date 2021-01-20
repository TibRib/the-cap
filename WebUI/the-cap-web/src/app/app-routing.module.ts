import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComparisonComponent } from './comparison/comparison.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LiveOutputPageComponent } from './live-output-page/live-output-page.component';
import { StatsComponent } from './stats/stats.component';
import { UploadboxComponent } from './uploadbox/uploadbox.component';
import {FormPageComponent} from './form-page/form-page.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

const routes: Routes = [
  { path : '', component: LandingPageComponent },
  { path : 'upload', component: UploadboxComponent },
  { path : 'form', component: FormPageComponent },
  { path : 'login', component: LoginComponent },
  { path : 'signup', component: SignupComponent },
  { path : 'live', component: LiveOutputPageComponent},
  { path : 'comparison', component: ComparisonComponent },

  // Redirection home si non trouvé
  { path : '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
