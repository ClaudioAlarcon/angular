import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenderizeComponent } from './components/exercises/genderize/genderize.component';

const routes: Routes = [
  {
    path: 'genderize',
    component: GenderizeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
