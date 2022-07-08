import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { combineLatest } from 'rxjs';

import { ApiService } from '../../../../../services/api.service';

@Injectable()
export class CompanyResolver implements Resolve<any> {

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): any {
    return new Promise((resolve, reject) => {
      const id = Number(route.paramMap.get('id'));
      // TODO: Move this into api service
      combineLatest([
        this.apiService.getCompanyById(id),
        this.apiService.getLinesByCompany(id),
      ]).subscribe(data => {
        const [company, lines] = data;
        resolve({ company, lines });
      });
    });
  }
}
