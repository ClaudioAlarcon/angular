import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { GenderizeComponent } from './components/exercises/genderize/genderize.component';
import { DonutchartComponent } from './components/exercises/widgets/donutchart/donutchart.component';
import { CountComponent } from './components/exercises/widgets/count/count.component';
import { ContentComponent } from './components/content/content.component';
import { ModalComponent } from './components/exercises/widgets/modal/modal.component';
import { NationalizeComponent } from './components/exercises/nationalize/nationalize.component';
import { TableComponent } from './components/exercises/widgets/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    GenderizeComponent,
    DonutchartComponent,
    CountComponent,
    ContentComponent,
    ModalComponent,
    NationalizeComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
