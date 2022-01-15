import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es-UY';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService } from './services/api.service'

import { HomeResolver } from './components/views/home/home.resolver';

import { HomeComponent } from './components/views/home/home.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  providers: [
    ApiService,
    HomeResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private localeService: BsLocaleService) {
    registerLocaleData(localeEs, 'es-uy');
    defineLocale('es', esLocale);
    this.localeService.use('es');
  }
}
