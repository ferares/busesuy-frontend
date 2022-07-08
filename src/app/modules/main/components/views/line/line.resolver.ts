import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { combineLatest } from 'rxjs';

import { ApiService } from '../../../../../services/api.service';

@Injectable()
export class LineResolver implements Resolve<any> {

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): any {
    return new Promise((resolve, reject) => {
      const id = Number(route.paramMap.get('id'));
      // TODO: Move this into api service
      this.apiService.getLineById(id).subscribe(line => {
        combineLatest(
          [
            this.apiService.getCompanyById(line.companyId),
            this.apiService.getLocationById(line.originId),
            this.apiService.getLocationById(line.destinationId),
            this.apiService.getStopsByLine(line.id),
          ]
        ).subscribe(data => {
          const [company, origin, destination, stops] = data
          resolve({ line, company, origin, destination, stops })
        });
      });
    });
  }
}
