import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/views/home/home.component';
import { HomeResolver } from './components/views/home/home.resolver';

import { LineComponent } from './components/views/line/line.component';
import { LineResolver } from './components/views/line/line.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: { locations: HomeResolver },
  },
  {
    path: 'linea/:name',
    component: LineComponent,
    resolve: { data: LineResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
