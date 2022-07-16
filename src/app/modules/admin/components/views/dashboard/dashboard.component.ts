import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  companies: Array<Company> = [];

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.titleService.setTitle($localize `Admin | BusesUY`);
    this.companies = route.snapshot.data['companies'];
  }
}
