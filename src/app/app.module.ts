import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEs from '@angular/common/locales/es-UY';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NgHcaptchaModule } from 'ng-hcaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService } from './services/api.service'
import { CacheService } from './services/cache.service'
import { ImagesService } from './services/images.service'
import { ModalService } from './services/modal.service'

import { HomeResolver } from './components/views/home/home.resolver';
import { LineResolver } from './components/views/line/line.resolver';
import { CompanyResolver } from './components/views/company/company.resolver';

import { HomeComponent } from './components/views/home/home.component';
import { LineComponent } from './components/views/line/line.component';
import { CompanyComponent } from './components/views/company/company.component';
import { ContactComponent } from './components/views/contact/contact.component';
import { AboutComponent } from './components/views/about/about.component';
import { DataComponent } from './components/views/data/data.component';

import { HeaderComponent } from './components/partials/header/header.component';
import { LoaderComponent } from './components/partials/loader/loader.component';
import { ResultsTableComponent } from './components/partials/results-table/results-table.component';
import { MessageComponent } from './components/partials/message/message.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { BackgroundsComponent } from './components/partials/backgrounds/backgrounds.component';
import { ModalComponent } from './components/partials/modal/modal.component';
import { DropdownComponent } from './components/partials/dropdown/dropdown.component';
import { LocationInputComponent } from './components/partials/location-input/location-input.component';
import { DayInputComponent } from './components/partials/day-input/day-input.component';
import { AccordionComponent } from './components/partials/accordion/accordion.component';
import { PopoverComponent } from './components/partials/popover/popover.component';
import { AlertComponent } from './components/partials/alert/alert.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LineComponent,
    CompanyComponent,
    ContactComponent,
    AboutComponent,
    HeaderComponent,
    LoaderComponent,
    ResultsTableComponent,
    MessageComponent,
    FooterComponent,
    DataComponent,
    BackgroundsComponent,
    ModalComponent,
    DropdownComponent,
    LocationInputComponent,
    DayInputComponent,
    AccordionComponent,
    PopoverComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgHcaptchaModule.forRoot({
      siteKey: environment.hcaptchaSiteKey,
      languageCode: 'es',
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-uy' },
    { provide: HTTP_INTERCEPTORS, useClass: CacheService, multi: true },
    ApiService,
    ImagesService,
    ModalService,
    HomeResolver,
    LineResolver,
    CompanyResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEs, 'es-uy');
  }
}
