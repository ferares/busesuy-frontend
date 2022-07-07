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

  private callAPI(method: string, url: string, body: any = undefined): Observable<any> {
    this.loaderService.setLoading(true);
    let call
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
    return this.callAPI('get', `${API_URL}/locations`);
  }

  getLineById(id: string) {
    return this.callAPI('get', `${API_URL}/lines/${id}`);
  }

  getStopsByLine(id: string) {
    return this.callAPI('get', `${API_URL}/lines/${id}/stops`);
  }

  getLinesByCompany(name: string) {
    return this.callAPI('get', `${API_URL}/companies/${name}/lines`);
  }

  getCompanyById(id: string) {
    return this.callAPI('get', `${API_URL}/companies/${id}`);
  }

  getDepartmentById(id: number) {
    return this.callAPI('get', `${API_URL}/departments/${id}`);
  }

  getLocationById(id: number) {
    return this.callAPI('get', `${API_URL}/locations/${id}`);
  }

  submitContact(data: any) {
    return this.callAPI('post', `${API_URL}/contact`, data);
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
