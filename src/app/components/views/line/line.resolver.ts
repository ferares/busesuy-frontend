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
            this.apiService.getLocationById(line.origin),
            this.apiService.getLocationById(line.destination),
          ]
        ).subscribe(locations => {
          const [origin, destination] = locations
          combineLatest(
            [
              this.apiService.getDepartmentById(origin.department),
              this.apiService.getDepartmentById(destination.department),
            ]
          ).subscribe(departments => {
            const [originDepartment, destinationDepartment] = departments
            resolve({
              line,
              origin: origin.name,
              originDepartment: originDepartment.name,
              destination: destination.name,
              destinationDepartment: destinationDepartment.name,
            })
          })
        });
      });
    });
  }
}
