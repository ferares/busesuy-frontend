import { Component, forwardRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { latinize } from 'ngx-bootstrap/typeahead';

import { go, highlight, prepare } from 'fuzzysort';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => LocationInputComponent),
  }],
})
export class LocationInputComponent implements ControlValueAccessor, OnChanges {
  @Input('id') id = '';
  @Input('name') name = '';
  @Input('required') required = false;
  @Input('invalidFeedback') invalidFeedback = '';
  @Input('locations') locations: any;
  @ViewChild('inputElement') private inputElement: any;
  public _value: string[] = [];
  public input: string = '';
  public disabled: boolean = false;
  private options: any = {};
  private optionsSearch: Array<any> = [];
  public filteredOptions: any = {};

  onChanged: any = () => {};
  onTouched: any = () => {};

  constructor() { }

  public writeValue(value: any): void {
    this._value = value || [];
  }

  public registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['locations']) {
      this.options = this.locations.reduce(
        (result: any, location: any) => {
          const locationLabel = this.getLocationString(location.name, location.department.name)
          return {
            ...result,
            [latinize(locationLabel)]: locationLabel,
          }
        },
        {},
      );
      this.optionsSearch = Object.keys(this.options).map(prepare);
    }
  }

  getLocationString(locationName: string, departmentName: string): string {
    if ((!locationName) || (!departmentName)) return '';
    return `${locationName}, ${departmentName}`;
  }

  filter(text: string): void {
    this.filteredOptions = go(
      latinize(text), // Remove tildes from search
      this.optionsSearch,
      { limit: 100, threshold: -100, allowTypo: false },
    ).map(result => {
      const value = this.options[result.target];
      return {
        value,
        target: highlight({
          ...result,
          target: value,
        }),
      };
    });
    if (!text) {
      this.filteredOptions = this.optionsSearch.map(option => {
        const value = this.options[option.target];
        return {
          value,
          target: value,
        }
      })
    }
  }

  setLocation(index: number): void {
    this.input = this.filteredOptions[index].value;
    this.inputElement.isOpen = false;
  }

  handleIntro(event: any): void {
    if ((event.code === 'Enter') || (event.code === 'NumpadEnter')) {
      if (this.inputElement.isOpen) {
        event.preventDefault();
        this.setLocation(0);
      }
    }
  }

  handleInput(): void {
    this.inputElement.isOpen = true;
    this.filter(this.input);
  }

}
