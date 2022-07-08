import { Component, ViewChildren, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-day-input',
  templateUrl: './day-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: DayInputComponent,
  }],
})
export class DayInputComponent implements ControlValueAccessor {
  @ViewChildren('dayBtns') dayBtns!: QueryList<any>;
  show = false;
  focusingOut!: ReturnType<typeof setTimeout>;
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

  open(): void {
    this.show = true;
  }

  handleFocusOut(): void {
    this.focusingOut = setTimeout(() => {
      this.show = false;
    }, 0);
  }

  handleFocusIn(): void {
    clearTimeout(this.focusingOut);
  }

  getFocusedDay(): number {
    const dayBtnsArray = this.dayBtns.toArray()
    for (let index = 0; index < dayBtnsArray.length; index++) {
      const dayBtn = dayBtnsArray[index];
      if (dayBtn.nativeElement === document.activeElement) {
        return index;
      }
    }

    return -1;
  }

  handleKeyDown(event: any): void {
    if ((event.code === 'ArrowUp') || (event.code === 'ArrowDown')) {
      event.preventDefault();
      const dayBtnsArray = this.dayBtns.toArray();
      const focusedIndex = this.getFocusedDay();
      if (focusedIndex > -1) {
        let next = focusedIndex + (event.code === 'ArrowUp' ? -1 : 1);
        if (next < 0) next = dayBtnsArray.length - 1;
        if (next >= dayBtnsArray.length) next = 0;
        dayBtnsArray[next].nativeElement.focus();
      } else {
        dayBtnsArray[0].nativeElement.focus();
      }
    } else if (event.code === 'Escape') {
      this.show = false;
    }
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

  toggleDay(day: string): void {
    const index = this.selectedDays.indexOf(day);
    if (index > -1) this.selectedDays.splice(index, 1);
    else this.selectedDays.push(day);
  }
}
