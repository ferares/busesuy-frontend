import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { LoginComponent } from './components/views/login/login.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';

import { DashboardResolver } from './components/views/dashboard/dashboard.resolver';

import { SharedModule } from '../shared/shared.module';

import { AuthService } from './services/auth.service';
import { AdminApiService } from './services/admin-api.service';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
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
  ],
})
export class AdminModule { }
