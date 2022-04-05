import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

import { HomeComponent } from './components/views/home/home.component';
import { HomeResolver } from './components/views/home/home.resolver';

import { LineComponent } from './components/views/line/line.component';
import { LineResolver } from './components/views/line/line.resolver';

import { CompanyComponent } from './components/views/company/company.component';
import { CompanyResolver } from './components/views/company/company.resolver';

import { ContactComponent } from './components/views/contact/contact.component';

import { AboutComponent } from './components/views/about/about.component';

import { DataComponent } from './components/views/data/data.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        resolve: { data: HomeResolver },
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
      {
        path: 'datos',
        component: DataComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
