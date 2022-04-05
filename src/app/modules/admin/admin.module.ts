import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { LoginComponent } from './components/views/login.component';

import { SharedModule } from '../shared/shared.module';

import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
  providers: [
    AuthService,
  ],
})
export class AdminModule { }
