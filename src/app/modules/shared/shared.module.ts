import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgHcaptchaModule } from 'ng-hcaptcha';

import { LoaderComponent } from './components/partials/loader/loader.component';
import { AlertComponent } from './components/partials/alert/alert.component';
import { LineDataComponent } from './components/partials/line-data/line-data.component';
import { CompanyDataComponent } from './components/partials/company-data/company-data.component';
import { LocationName } from './components/partials/location-name/location-name.component';
import { Frequency } from './components/partials/frequency/frequency.component';

import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [
    LoaderComponent,
    AlertComponent,
    LineDataComponent,
    CompanyDataComponent,
    LocationName,
    Frequency,
  ],
  exports: [
    LoaderComponent,
    AlertComponent,
    LineDataComponent,
    CompanyDataComponent,
    LocationName,
    Frequency,
    FormsModule,
    ReactiveFormsModule,
    NgHcaptchaModule,
    RouterModule,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgHcaptchaModule.forRoot({
      siteKey: environment.hcaptchaSiteKey,
      languageCode: 'es',
    }),
  ],
})
export class SharedModule {}
