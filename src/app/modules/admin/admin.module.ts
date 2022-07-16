import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { LoginComponent } from './components/views/login/login.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { CompanyComponent } from './components/views/company/company.component';
import { LineComponent } from './components/views/line/line.component';

import { DashboardResolver } from './components/views/dashboard/dashboard.resolver';
import { CompanyResolver } from './components/views/company/company.resolver';
import { LineResolver } from './components/views/line/line.resolver';

import { SharedModule } from '../shared/shared.module';

import { AuthService } from './services/auth.service';
import { AdminApiService } from './services/admin-api.service';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    CompanyComponent,
    LineComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    AdminApiService,
    DashboardResolver,
    CompanyResolver,
    LineResolver,
  ],
})
export class AdminModule { }
