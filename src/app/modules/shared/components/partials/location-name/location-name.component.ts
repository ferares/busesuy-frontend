import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-location-name',
  templateUrl: './location-name.component.html',
})
export class LocationName {
  @Input('location') location: any;

  constructor() { }
}
