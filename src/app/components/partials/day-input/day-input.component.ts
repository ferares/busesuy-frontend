import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-day-input',
  templateUrl: './day-input.component.html',
  styleUrls: ['./day-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: DayInputComponent,
  }],
})
export class DayInputComponent implements ControlValueAccessor {
  @Input('input-id') id = '';
  @Input('name') name = '';
  @Input('options') options: any = [];
  selectedDays: Array<string> = [];
  days = [
    {
      label:  $localize `Lunes`,
      value: 'lu',
    },
    {
      label:  $localize `Martes`,
      value: 'ma',
    },
    {
      label:  $localize `Miércoles`,
      value: 'mi',
    },
    {
      label:  $localize `Jueves`,
      value: 'ju',
    },
    {
      label:  $localize `Viernes`,
      value: 'vi',
    },
    {
      label:  $localize `Sábado`,
      value: 'sa',
    },
    {
      label:  $localize `Domingo`,
      value: 'do',
    },
    {
      label:  $localize `Feriados`,
      value: 'fe',
    },
  ];
  onChanged: any = (value: string) => {};
  onTouched: any = () => {};

  constructor() {}

  writeValue(value: any): void {
    this.selectedDays = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getSelectedDaysString(): string {
    if (!this.selectedDays.length) return $localize `Cualquier día`
    let selectedDaysLabels = []
    for (const dayValue of this.selectedDays) {
      const day = this.days.find(day => day.value === dayValue)
      selectedDaysLabels.push(day?.label)
    }
    return selectedDaysLabels.join(', ')
  }

  toggleDay(event: Event, day: string): void {
    event.preventDefault();
    event.stopPropagation();
    const index = this.selectedDays.indexOf(day);
    if (index > -1) this.selectedDays.splice(index, 1);
    else this.selectedDays.push(day);
  }
}
