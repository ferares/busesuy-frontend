import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Line } from 'src/app/models/line.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent {
  lines: Array<Line> = [];

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.titleService.setTitle($localize `Admin | BusesUY`);
    this.lines = route.snapshot.data['lines'];
  }
}
