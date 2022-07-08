import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AlertSettings } from '../models/alert-settings.model';
import { Location } from '../models/location.model';
import { Department } from '../models/department.model';
import { Company } from '../models/company.model';
import { Stop } from '../models/stop.model';
import { Line } from '../models/line.model';

import { LoaderService } from './loader.service';
import { AlertService } from './alert.service';
import { Result } from '../models/result.model';

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

  getLocations(): Observable<Array<Location>> {
    return this.callAPI('get', 'locations');
  }

  getLineById(id: number): Observable<Line> {
    return this.callAPI('get', `lines/${id}`);
  }

  getStopsByLine(id: number): Observable<Array<Stop>> {
    return this.callAPI('get', `lines/${id}/stops`);
  }

  getLinesByCompany(id: number): Observable<Array<Line>> {
    return this.callAPI('get', `companies/${id}/lines`);
  }

  getCompanyById(id: number): Observable<Company> {
    return this.callAPI('get', `companies/${id}`);
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.callAPI('get', `departments/${id}`);
  }

  getLocationById(id: number): Observable<Location> {
    return this.callAPI('get', `locations/${id}`);
  }

  submitContact(data: any): Observable<any> {
    return this.callAPI('post', 'contact', data);
  }

  findRoutes(
    origin: String,
    originDepartment: String,
    destination: String,
    destinationDepartment: String,
    days: String,
  ): Observable<Array<Array<Result>>> {
    this.loaderService.setLoading(true);
    const params: any = {
      origin,
      originDepartment,
      destination,
      destinationDepartment,
      days,
    };
    return this.callAPI('get', 'lines/search', { params });
  }
}
