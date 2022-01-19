import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent {
  line: any = undefined as any;

  constructor(private route: ActivatedRoute) {
    this.line = route.snapshot.data['data'].line;
    this.line.origin = route.snapshot.data['data'].origin.nameLocation;
    this.line.destination = route.snapshot.data['data'].destination.nameLocation;
    console.log(this.line)
  }
}
