import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgHcaptchaModule } from 'ng-hcaptcha';

import { LoaderComponent } from './components/partials/loader/loader.component';
import { AlertComponent } from './components/partials/alert/alert.component';

import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [
    LoaderComponent,
    AlertComponent,
  ],
  exports: [
    LoaderComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    NgHcaptchaModule,
  ],
  imports: [
    CommonModule,
    NgHcaptchaModule.forRoot({
      siteKey: environment.hcaptchaSiteKey,
      languageCode: 'es',
    }),
  ],
})
export class SharedModule {}
