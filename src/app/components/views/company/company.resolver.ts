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
        resolve({ company, lines })
      });
    });
  }
}
