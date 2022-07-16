import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Line } from 'src/app/models/line.model';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
})
export class LineComponent {
  line: Line;

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.titleService.setTitle($localize `Admin | BusesUY`);
    this.line = route.snapshot.data['line'];
  }
}
