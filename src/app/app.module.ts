import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEs from '@angular/common/locales/es-UY';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './modules/shared/shared.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { ApiService } from './services/api.service';
import { CacheService } from './services/cache.service';
import { ModalService } from './services/modal.service';
import { LoaderService } from './services/loader.service';
import { ErrorInterceptor } from './services/error.interceptor';
import { AlertService } from './services/alert.service';

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
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-uy' },
    { provide: HTTP_INTERCEPTORS, useClass: CacheService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AlertService,
    ApiService,
    ModalService,
    LoaderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEs, 'es-uy');
  }
}
