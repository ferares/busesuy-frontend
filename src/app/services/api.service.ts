import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AlertSettings } from '../models/alert-settings.model';

import { LoaderService } from './loader.service';
import { AlertService } from './alert.service';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private alertService: AlertService,
  ) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    this.alertService.alert(AlertSettings.ERROR, error.message, true)
    return of(undefined)
  }

  private callAPI(method: string, path: string, body: any = undefined): Observable<any> {
    this.loaderService.setLoading(true);
    let call
    const url = `${API_URL}/${path}`
    if (method === 'post') {
      call = this.http.post<any>(url, body);
    } else {
      call = this.http.get<any>(url, body);
    }
   
    return call.pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  getLocations() {
    return this.callAPI('get', 'locations');
  }

  getLineById(id: string) {
    return this.callAPI('get', `lines/${id}`);
  }

  getStopsByLine(id: string) {
    return this.callAPI('get', `lines/${id}/stops`);
  }

  getLinesByCompany(name: string) {
    return this.callAPI('get', `companies/${name}/lines`);
  }

  getCompanyById(id: string) {
    return this.callAPI('get', `companies/${id}`);
  }

  getDepartmentById(id: number) {
    return this.callAPI('get', `departments/${id}`);
  }

  getLocationById(id: number) {
    return this.callAPI('get', `locations/${id}`);
  }

  submitContact(data: any) {
    return this.callAPI('post', 'contact', data);
  }

  findRoutes(
    origin: String,
    originDepartment: String,
    destination: String,
    destinationDepartment: String,
    days: String,
  ) {
    this.loaderService.setLoading(true);
    const params: any = {
      origin,
      originDepartment,
      destination,
      destinationDepartment,
      days,
    };
    return this.callAPI('get', `${API_URL}/lines/search`, { params });
  }
}
