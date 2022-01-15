import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ApiService } from '../../../services/api.service';

@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(private apiService: ApiService) {}

  resolve(): any {
    return new Promise((resolve, reject) => {
      this.apiService.getLocations().subscribe(
        locations => resolve(locations)
      );
    });
  }
}
