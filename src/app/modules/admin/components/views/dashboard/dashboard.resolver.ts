import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { AdminApiService } from '../../../services/admin-api.service';
import { AuthService } from '../../../services/auth.service';

@Injectable()
export class DashboardResolver implements Resolve<any> {

  constructor(
    private adminApiService: AdminApiService,
    private authService: AuthService,
  ) {}

  resolve(): any {
    return new Promise((resolve, reject) => {
      const id = this.authService.getUser()?.id;
      if (!id) return reject(false);
      this.adminApiService.getUserCompanies(id).subscribe(resolve);
    });
  }
}
