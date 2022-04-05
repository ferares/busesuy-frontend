import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es-UY';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NgHcaptchaModule } from 'ng-hcaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEs, 'es-uy');
  }
}
