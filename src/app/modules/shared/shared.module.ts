import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgHcaptchaModule } from 'ng-hcaptcha';

import { LoaderComponent } from './components/partials/loader/loader.component';
import { AlertTemplateComponent } from './components/partials/alert-template/alert-template.component';
import { AlertsComponent } from './components/partials/alerts/alerts.component';
import { LineDataComponent } from './components/partials/line-data/line-data.component';
import { CompanyDataComponent } from './components/partials/company-data/company-data.component';
import { LocationName } from './components/partials/location-name/location-name.component';
import { Frequency } from './components/partials/frequency/frequency.component';
import { LocationInputComponent } from './components/partials/location-input/location-input.component';

import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [
    LoaderComponent,
    AlertTemplateComponent,
    AlertsComponent,
    LineDataComponent,
    CompanyDataComponent,
    LocationName,
    LocationInputComponent,
    Frequency,
  ],
  exports: [
    LoaderComponent,
    AlertTemplateComponent,
    AlertsComponent,
    LineDataComponent,
    CompanyDataComponent,
    LocationName,
    LocationInputComponent,
    Frequency,
    FormsModule,
    ReactiveFormsModule,
    NgHcaptchaModule,
    RouterModule,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgHcaptchaModule.forRoot({
      siteKey: environment.hcaptchaSiteKey,
      languageCode: 'es',
    }),
  ],
})
export class SharedModule {}
