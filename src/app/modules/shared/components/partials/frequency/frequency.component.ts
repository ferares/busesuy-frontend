import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
})
export class Frequency {
  @Input('frequency') frequency: any;

  constructor() { }
}
