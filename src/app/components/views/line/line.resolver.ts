import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { combineLatest } from 'rxjs';

import { ApiService } from '../../../services/api.service';

@Injectable()
export class LineResolver implements Resolve<any> {

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): any {
    return new Promise((resolve, reject) => {
      const name = route.paramMap.get('name') || '';
      this.apiService.getLineByName(name).subscribe(line => {
        combineLatest(
          [
            this.apiService.getLocationById(line.idOrigin),
            this.apiService.getLocationById(line.idDestination),
          ]
        ).subscribe(locations => {
          resolve({
            line,
            origin: locations[0],
            destination: locations[1],
          })
        });
      });
    });
  }
}
