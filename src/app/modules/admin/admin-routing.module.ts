import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { LoginComponent } from './components/views/login/login.component';
import { CompanyComponent } from './components/views/company/company.component';
import { LineComponent } from './components/views/line/line.component';

import { DashboardResolver } from './components/views/dashboard/dashboard.resolver';
import { CompanyResolver } from './components/views/company/company.resolver';
import { LineResolver } from './components/views/line/line.resolver';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        resolve: { companies: DashboardResolver },
      },
      {
        path: 'lineas/nueva',
        component: LineComponent,
      },
      {
        path: 'lineas/:id',
        component: LineComponent,
        resolve: { data: LineResolver },
      },
      {
        path: 'empresas/:id',
        component: CompanyComponent,
        resolve: { lines: CompanyResolver },
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
