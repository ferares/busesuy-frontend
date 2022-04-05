import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { ImagesService } from './services/images.service';

import { HomeResolver } from './components/views/home/home.resolver';
import { LineResolver } from './components/views/line/line.resolver';
import { CompanyResolver } from './components/views/company/company.resolver';

import { HomeComponent } from './components/views/home/home.component';
import { LineComponent } from './components/views/line/line.component';
import { CompanyComponent } from './components/views/company/company.component';
import { ContactComponent } from './components/views/contact/contact.component';
import { AboutComponent } from './components/views/about/about.component';
import { DataComponent } from './components/views/data/data.component';

import { HeaderComponent } from './components/partials/header/header.component';
import { LoaderComponent } from './components/partials/loader/loader.component';
import { ResultsTableComponent } from './components/partials/results-table/results-table.component';
import { MessageComponent } from './components/partials/message/message.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { BackgroundsComponent } from './components/partials/backgrounds/backgrounds.component';
import { ModalComponent } from './components/partials/modal/modal.component';
import { DropdownComponent } from './components/partials/dropdown/dropdown.component';
import { LocationInputComponent } from './components/partials/location-input/location-input.component';
import { DayInputComponent } from './components/partials/day-input/day-input.component';
import { AccordionComponent } from './components/partials/accordion/accordion.component';
import { PopoverComponent } from './components/partials/popover/popover.component';
import { AlertComponent } from './components/partials/alert/alert.component';
import { LineDataComponent } from './components/partials/line-data/line-data.component';
import { CompanyDataComponent } from './components/partials/company-data/company-data.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    LineComponent,
    CompanyComponent,
    ContactComponent,
    AboutComponent,
    HeaderComponent,
    LoaderComponent,
    ResultsTableComponent,
    MessageComponent,
    FooterComponent,
    DataComponent,
    BackgroundsComponent,
    ModalComponent,
    DropdownComponent,
    LocationInputComponent,
    DayInputComponent,
    AccordionComponent,
    PopoverComponent,
    AlertComponent,
    LineDataComponent,
    CompanyDataComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
  ],
  providers: [
    ImagesService,
    HomeResolver,
    LineResolver,
    CompanyResolver,
  ],
})
export class MainModule { }
