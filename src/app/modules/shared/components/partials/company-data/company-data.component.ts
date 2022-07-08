import { Component, Input } from '@angular/core';

import { Company } from 'src/app/models/company.model';
import { Line } from 'src/app/models/line.model';

class LineData {
  lines!: Array<Line>;
  company!: Company;
}

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
})
export class CompanyDataComponent {
  @Input('data') data!: LineData;
  constructor() {}
}
