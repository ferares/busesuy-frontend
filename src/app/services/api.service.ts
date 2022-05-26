import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { finalize } from 'rxjs/operators';

import { LoaderService } from './loader.service';

import { environment } from '../../environments/environment';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
  ) { }

  getLocations() {
    this.loaderService.setLoading(true);
    return this.http.get<any>(`${API_URL}/locations`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  getLineById(id: string) {
    this.loaderService.setLoading(true);
    return this.http.get<any>(`${API_URL}/lines/${id}`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  getStopsByLine(id: string) {
    this.loaderService.setLoading(true);
    return this.http.get<any>(`${API_URL}/lines/${id}/stops`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  getLinesByCompany(name: string) {
    this.loaderService.setLoading(true);
    return this.http.get<any>(`${API_URL}/companies/${name}/lines`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  getCompanyById(id: string) {
    this.loaderService.setLoading(true);
    return this.http.get<any>(`${API_URL}/companies/${id}`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  getDepartmentById(id: number) {
    this.loaderService.setLoading(true);
    return this.http.get<any>(`${API_URL}/departments/${id}`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  getLocationById(id: number) {
    this.loaderService.setLoading(true);
    return this.http.get<any>(`${API_URL}/locations/${id}`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  submitContact(data: any) {
    this.loaderService.setLoading(true);
    return this.http.post<any>(`${API_URL}/contact`, data).pipe(
      finalize(() => this.loaderService.setLoading(false))
    );
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
    return this.http.get<any>(`${API_URL}/lines/search`, { params }).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }
}
