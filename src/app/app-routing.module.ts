import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/views/home/home.component';
import { HomeResolver } from './components/views/home/home.resolver';

import { LineComponent } from './components/views/line/line.component';
import { LineResolver } from './components/views/line/line.resolver';

import { CompanyComponent } from './components/views/company/company.component';
import { CompanyResolver } from './components/views/company/company.resolver';

import { ContactComponent } from './components/views/contact/contact.component';

import { AboutComponent } from './components/views/about/about.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: { locations: HomeResolver },
  },
  {
    path: 'lineas/:name',
    component: LineComponent,
    resolve: { data: LineResolver },
  },
  {
    path: 'empresas/:name',
    component: CompanyComponent,
    resolve: { company: CompanyResolver },
  },
  {
    path: 'contacto',
    component: ContactComponent,
  },
  {
    path: 'proyecto',
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
