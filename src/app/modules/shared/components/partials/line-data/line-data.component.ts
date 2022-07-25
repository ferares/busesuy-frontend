import { Component, Input } from '@angular/core';

import { Company } from 'src/app/models/company.model';
import { Line } from 'src/app/models/line.model';
import { Stop } from 'src/app/models/stop.model';

class LineData {
  line!: Line;
  company!: Company;
  origin!: Location;
  destination!: Location;
  stops!: Array<Stop>;
}

@Component({
  selector: 'app-line-data',
  templateUrl: './line-data.component.html',
})
export class LineDataComponent {
  @Input('data') data! : LineData;
}
