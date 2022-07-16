import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { LoaderService } from '../../../services/loader.service';
import { AlertService } from '../../../services/alert.service';

import { AlertSettings } from '../../../models/alert-settings.model';

import { environment } from '../../../../environments/environment';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  options = { withCredentials: true };

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private alertService: AlertService,
  ) { }

  private handleError(error: HttpErrorResponse) {
    this.alertService.alert(AlertSettings.ERROR, error.message, true)
    return of(undefined)
  }

  private callAPI(method: string, path: string, body: any = undefined): Observable<any> {
    this.loaderService.setLoading(true);
    let call
    const url = `${API_URL}/${path}`
    if (method === 'post') {
      call = this.http.post<any>(url, body, this.options);
    } else if (method === 'put') {
      call = this.http.put<any>(url, body, this.options);
    } else if (method === 'delete') {
      call = this.http.delete<any>(url, this.options);
    } else {
      call = this.http.get<any>(url, this.options);
    }
   
    return call.pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  getUsers() {
    return this.callAPI('get', `users`);
  }

  getUserCompanies() {
    return this.callAPI('get', `users/companies`);
  }

  createUser(data: any) {
    return this.callAPI('post', `users`, data);
  }

  updateUser(id: number, data: any) {
    return this.callAPI('put', `users/${id}`, data);
  }

  updateSelf(data: any) {
    return this.callAPI('put', `users`, data);
  }

  createDepartment(data: any) {
    return this.callAPI('post', `departments`, data);
  }

  updateDepartment(id: number, data: any) {
    return this.callAPI('put', `departments/${id}`, data);
  }

  deleteDepartment(id: number) {
    return this.callAPI('delete', `departments/${id}`);
  }

  createLocation(data: any) {
    return this.callAPI('post', `locations`, data);
  }

  updateLocation(id: number, data: any) {
    return this.callAPI('put', `locations/${id}`, data);
  }

  deleteLocation(id: number) {
    return this.callAPI('delete', `locations/${id}`);
  }

  createCompany(data: any) {
    return this.callAPI('post', `companies`, data);
  }

  updateCompany(id: number, data: any) {
    return this.callAPI('put', `companies/${id}`, data);
  }

  deleteCompany(id: number) {
    return this.callAPI('delete', `companies/${id}`);
  }

  createLine(data: any) {
    return this.callAPI('post', `lines`, data);
  }

  updateLine(id: number, data: any) {
    return this.callAPI('put', `lines/${id}`, data);
  }

  deleteLine(id: number) {
    return this.callAPI('delete', `lines/${id}`);
  }
}
