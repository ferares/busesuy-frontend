import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { AdminApiService } from '../../../services/admin-api.service';

@Injectable()
export class DashboardResolver implements Resolve<any> {

  constructor(private adminApiService: AdminApiService) {}

  resolve(): any {
    return new Promise((resolve, reject) => {
      this.adminApiService.getUserCompanies().subscribe(resolve);
    });
  }
}
