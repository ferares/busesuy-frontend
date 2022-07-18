import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { LineData } from 'src/app/models/line-data.model';
import { Location } from 'src/app/models/location.model';
import { getLocationString } from 'src/app/modules/main/utils';

class stopControl {
  location!: FormControl;
  time!: FormControl;
}

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
})
export class LineComponent {
  locations: Array<Location>;
  lineData: LineData;
  form: FormGroup;
  formStops: FormArray<FormGroup<stopControl>>;

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute) {
    this.titleService.setTitle($localize `Admin | BusesUY`);
    const { locations, lineData } = activatedRoute.snapshot.data['data'];
    this.lineData = lineData
    this.locations = locations
    const { origin, destination, line, stops } = this.lineData;
    const { startTime, endTime, route, frequency } = line;
    const originLabel = getLocationString(origin.name, origin.department.name);
    const destinationLabel = getLocationString(destination.name, destination.department.name);
    this.formStops = new FormArray(stops.map((stop) => new FormGroup({
      location: new FormControl(getLocationString(stop.location.name, stop.location.department.name), Validators.required),
      time: new FormControl(stop.time, Validators.required),
    })));
    this.form = new FormGroup({
      origin: new FormControl(originLabel, Validators.required),
      destination: new FormControl(destinationLabel, Validators.required),
      startTime: new FormControl(startTime, Validators.required),
      endTime: new FormControl(endTime, Validators.required),
      route: new FormControl(route, Validators.required),
      frequency: new FormControl(frequency, Validators.required),
      stops: this.formStops,
    })
  }

  addStop(): void {
    this.formStops.push(new FormGroup({
      location: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
    }));
  }

  saveLine(): void {
    console.log('TODO: Save changes');
  }
}
