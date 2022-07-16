import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { ApiService } from '../../../../../services/api.service';

@Injectable()
export class CompanyResolver implements Resolve<any> {

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): any {
    return new Promise((resolve, reject) => {
      const id = Number(route.paramMap.get('id'));
      this.apiService.getLinesByCompany(id).subscribe(resolve);
    });
  }
}
