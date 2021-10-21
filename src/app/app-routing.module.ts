import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { GenderizeComponent } from './components/exercises/genderize/genderize.component';

const routes: Routes = [
  {
    path: 'genderize',
    component: GenderizeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, HttpClientModule , RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
