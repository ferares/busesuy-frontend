import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  company: any = undefined as any;
  lines: Array<any>;

  constructor(private route: ActivatedRoute) {
    this.company = route.snapshot.data['company'].company;
    this.lines = route.snapshot.data['company'].lines;
  }
}
