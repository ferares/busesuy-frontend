import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/views/home/home.component';
import { HomeResolver } from './components/views/home/home.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, resolve: { locations: HomeResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
