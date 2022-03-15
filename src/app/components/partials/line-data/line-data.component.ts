import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-line-data',
  templateUrl: './line-data.component.html',
  styleUrls: ['./line-data.component.scss']
})
export class LineDataComponent {
  @Input('data') data!: any;
  constructor() {}
}
