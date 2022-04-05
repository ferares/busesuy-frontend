import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from './components/partials/loader/loader.component';
import { AlertComponent } from './components/partials/alert/alert.component';

@NgModule({
  declarations: [
    LoaderComponent,
    AlertComponent,
  ],
  exports: [
    LoaderComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
