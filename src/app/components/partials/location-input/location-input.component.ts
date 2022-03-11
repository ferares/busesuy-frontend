import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  @ViewChildren('locationBtns') locationBtns!: QueryList<any>;
  locations: any;
  input = '';
  value = '';
  locationsSearch: Array<any> = [];
  filteredLocations: any;
  open = false;
  focusingOut: any;
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

  getFocusedLocation(): number {
    const locationBtnsArray = this.locationBtns.toArray();
    for (let index = 0; index < locationBtnsArray.length; index++) {
      const locationBtn = locationBtnsArray[index];
      if (locationBtn.nativeElement === document.activeElement) {
        return index;
      }
    }

    return -1;
  }

  handleKeyDown(event: any): void {
    if ((event.code === 'Enter') || (event.code === 'NumpadEnter')) {
      if (this.open) {
        const focusedIndex = this.getFocusedLocation();
        if (focusedIndex === -1) {
          event.preventDefault();
          this.setLocation(0);
        }
      }
    } else if ((event.code === 'ArrowUp') || (event.code === 'ArrowDown')) {
      event.preventDefault();
      const locationBtnsArray = this.locationBtns.toArray()
      const focusedIndex = this.getFocusedLocation();
      if (focusedIndex > -1) {
        let next = focusedIndex + (event.code === 'ArrowUp' ? -1 : 1);
        if (next < 0) next = locationBtnsArray.length - 1;
        if (next >= locationBtnsArray.length) next = 0;
        locationBtnsArray[next].nativeElement.focus();
      } else {
        locationBtnsArray[0].nativeElement.focus();
      }
    } else if (event.code === 'Escape') {
      this.open = false;
    }
  }

  handleFocusOut(): void {
    // Set timeout to wait and see if a focusin will happen
    this.focusingOut = setTimeout(() => {
      this.open = false;
    }, 0);
  }

  handleFocusIn(): void {
    // Clear the timeout from focusout that would close the dropdown
    clearTimeout(this.focusingOut);
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
