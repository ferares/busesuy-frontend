import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.scss']
})
export class CompanyDataComponent {
  @Input('data') data!: any;
  constructor() {}
}
