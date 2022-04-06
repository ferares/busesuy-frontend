import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
})
export class CompanyDataComponent {
  @Input('data') data!: any;
  constructor() {}
}
