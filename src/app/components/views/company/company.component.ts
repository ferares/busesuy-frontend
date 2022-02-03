import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  company: any = undefined as any;
  lines: Array<any>;

  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.company = route.snapshot.data['company'].company;
    this.lines = route.snapshot.data['company'].lines;
    this.titleService.setTitle(`${this.company.name} | BusesUY`);
  }
}
