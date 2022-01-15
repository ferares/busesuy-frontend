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
  results: Array<any> = [];
  origin = '';
  destination = '';
  date='';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.locations = route.snapshot.data['locations'].map(
      (location: any) => `${location.name}, ${location.department}`
    );
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
      this.date,
    ).subscribe(
      (results: Array<any>) => {
        this.results = results;
      }
    )
  }

}
