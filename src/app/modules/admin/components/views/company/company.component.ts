import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Line } from 'src/app/models/line.model';
import { Location } from 'src/app/models/location.model';

class LineList {
  origin!: Location;
  destination!: Location;
  lines!: Array<Line>;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent {
  lineLists: Array<LineList> = [];

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.titleService.setTitle($localize `Admin | BusesUY`);
    const lines = route.snapshot.data['lines'];
    for (const line of lines) {
      let lineList = this.lineLists.find((lineList: LineList) => {
        return ((lineList.origin.id === line.origin.id) && (lineList.destination.id === line.destination.id));
      });
      if (!lineList) {
        lineList = { origin: line.origin, destination: line.destination, lines: [] };
        this.lineLists.push(lineList);
      }
      lineList.lines.push(line);
    }
  }
}
