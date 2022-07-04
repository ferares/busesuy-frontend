import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent {
  data: any = undefined as any;

  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.data = this.route.snapshot.data['data'];
    this.titleService.setTitle($localize `Línea ${this.data.line.name} | BusesUY`);
  }
}
