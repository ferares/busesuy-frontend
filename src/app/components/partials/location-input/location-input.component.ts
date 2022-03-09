import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { latinMap } from './latin-map';

import { go, highlight, prepare } from 'fuzzysort';

import { getLocationString } from '../../../utils';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: LocationInputComponent,
  }],
})
export class LocationInputComponent implements ControlValueAccessor, OnInit {
  @Input('input-id') id = '';
  @Input('name') name = '';
  @Input('options') options: any = [];
  locations: any;
  input = '';
  value = '';
  locationsSearch: Array<any> = [];
  filteredLocations: any;
  open = false;
  onChanged: any = (value: string) => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit(): void {
    this.locations = this.options.reduce(
      (result: any, location: any) => {
        const locationLabel = getLocationString(location.name, location.department.name)
        return {
          ...result,
          [this.latinize(locationLabel)]: locationLabel,
        }
      },
      {},
    );
    this.locationsSearch = Object.keys(this.locations).map(prepare);
  }

  writeValue(value: any): void {
    this.value = value;
    this.input = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  latinize(str: string): string {
    if (!str) return '';
    return str.replace(/[^A-Za-z0-9[\] ]/g, function(a: string): string {
      return latinMap[a] || a;
    });
  }

  handleIntro(event: any): void {
    if ((event.code === 'Enter') || (event.code === 'NumpadEnter')) {
      if (this.open) {
        event.preventDefault();
        this.setLocation(0);
      }
    }
  }

  handleBlur(): void {
    this.open = false;
  }

  handleInput(): void {
    this.open = true;
    this.filter(this.input);
  }

  filter(text: string): void {
    this.filteredLocations = go(
      this.latinize(text), // Remove tildes from search
      this.locationsSearch,
      { limit: 100, threshold: -100, allowTypo: false },
    ).map(result => {
      const value = this.locations[result.target];
      return {
        value,
        target: highlight({
          ...result,
          target: value,
        }),
      };
    });

    if (!text) {
      this.filteredLocations = this.locationsSearch.map(location => {
        const value = this.locations[location.target];
        return {
          value,
          target: value,
        }
      })
    }

    if (!this.filteredLocations.length) this.open = false;
  }

  setLocation(index: number): void {
    this.writeValue(this.filteredLocations[index]?.value);
    this.onTouched();
    this.onChanged(this.value);
    this.open = false;
  }
}
