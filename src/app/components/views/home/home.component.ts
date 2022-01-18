import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  locations: Array<any>;
  results: Array<any> = undefined as any;
  resultsOrigin = '';
  resultsDestination = '';
  origin = '';
  destination = '';
  selectedDays: Array<String> = [];
  days = [
    {
      label: 'Lunes',
      value: 'lu',
    },
    {
      label: 'Martes',
      value: 'ma',
    },
    {
      label: 'Miércoles',
      value: 'mi',
    },
    {
      label: 'Jueves',
      value: 'ju',
    },
    {
      label: 'Viernes',
      value: 'vi',
    },
    {
      label: 'Sábado',
      value: 'sa',
    },
    {
      label: 'Domingo',
      value: 'do',
    },
    {
      label: 'Feriados',
      value: 'fe',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.locations = route.snapshot.data['locations'].map(
      (location: any) => `${location.name}, ${location.department}`
    );
  }

  getSelectedDaysString(): String {
    if (!this.selectedDays.length) return 'Cualquier día'
    let selectedDaysLabels = []
    for (const dayValue of this.selectedDays) {
      const day = this.days.find(day => day.value === dayValue)
      selectedDaysLabels.push(day?.label)
    }
    return selectedDaysLabels.join(', ')
  }

  toggleDay(event: Event, day: String): void {
    event.preventDefault();
    event.stopPropagation();
    const index = this.selectedDays.indexOf(day);
    if (index > -1) this.selectedDays.splice(index, 1);
    else this.selectedDays.push(day);
  }

  search(): void {
    const originArray = this.origin.split(', ')
    const originDepartment = originArray[1]
    const origin = originArray[0]
    const destinationArray = this.destination.split(', ')
    const destinationDepartment = destinationArray[1]
    const destination = destinationArray[0]
    this.apiService.findRoutes(
      origin,
      originDepartment,
      destination,
      destinationDepartment,
      this.selectedDays.join(','),
    ).subscribe(
      (results: Array<any>) => {
        this.results = results;
        this.resultsOrigin = this.origin;
        this.resultsDestination = this.destination;
      }
    )
  }

}
