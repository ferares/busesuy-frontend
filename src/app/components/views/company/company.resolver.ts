import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { combineLatest } from 'rxjs';

import { ApiService } from '../../../services/api.service';

@Injectable()
export class CompanyResolver implements Resolve<any> {

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): any {
    return new Promise((resolve, reject) => {
      const id = route.paramMap.get('id') || '';
      combineLatest([
        this.apiService.getCompanyById(id),
        this.apiService.getLinesByCompany(id),
      ]).subscribe((data: Array<any>) => {
        const [company, lines] = data;
        resolve({ company, lines });
      });
    });
  }
}
