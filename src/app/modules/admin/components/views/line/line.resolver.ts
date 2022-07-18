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
      combineLatest([
        this.apiService.getLocations(),
        this.apiService.getLineDataById(id),
      ]).subscribe((data: Array<any>) => {
        const [locations, lineData] = data;
        resolve({ locations, lineData });
      });
      this.apiService.getLineDataById(id).subscribe(resolve);
    });
  }
}
