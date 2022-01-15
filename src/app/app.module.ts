import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es-UY';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

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
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [
    ApiService,
    HomeResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEs, 'es-uy');
  }
}
