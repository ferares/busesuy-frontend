import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { combineLatest } from 'rxjs';

import { ApiService } from '../../../services/api.service';

@Injectable()
export class CompanyResolver implements Resolve<any> {

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): any {
    return new Promise((resolve, reject) => {
      const name = route.paramMap.get('name') || '';
      combineLatest([
        this.apiService.getCompanyByName(name),
        this.apiService.getLinesByCompany(name),
      ]).subscribe((data: Array<any>) => {
        const [company, lines] = data;
        const promises = [];
        const locations: Array<any> = [];
        for (const line of lines) {
          if (!locations.includes(line.origin)) {
            locations.push(line.origin);
            promises.push(this.apiService.getLocationById(line.origin));
          }
          if (!locations.includes(line.destination)) {
            locations.push(line.destination);
            promises.push(this.apiService.getLocationById(line.destination));
          }
        }
        combineLatest(promises).subscribe((locations: Array<any>) => {
          const promises = [];
          const departments: Array<any> = [];
          for (const location of locations) {
            if (!departments.includes(location.department)) {
              departments.push(location.department);
              promises.push(this.apiService.getDepartmentById(location.department));
            }
          }
          combineLatest(promises).subscribe((departments: Array<any>) => {
            for (const location of locations) {
              location.department = departments.find(
                department => department.id === location.department
              ).name;
            }
            for (const line of lines) {
              line.origin = locations.find(
                location => location.id === line.origin
              );
              line.destination = locations.find(
                location => location.id === line.destination
              );
            }
            resolve({ company, lines });
          });
        });
      });
    });
  }
}
