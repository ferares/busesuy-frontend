import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  data: any;

  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.data = {};
    this.data.company = route.snapshot.data['company'].company;
    this.data.lines = route.snapshot.data['company'].lines;
    this.titleService.setTitle(`${this.data.company.name} | BusesUY`);
  }
}
