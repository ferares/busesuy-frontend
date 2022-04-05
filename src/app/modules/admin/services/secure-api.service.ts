import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { finalize } from 'rxjs/operators';

import { LoaderService } from '../../../services/loader.service';

import { environment } from '../../../../environments/environment';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class SecureApiService {
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
  ) { }

  getUsers() {
    this.loaderService.setLoading(true);
    return this.http.get<any>(`${API_URL}/users`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  getUserCompanies(id: number) {
    this.loaderService.setLoading(true);
    return this.http.get<any>(`${API_URL}/users/${id}/companies`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  createUser(data: any) {
    this.loaderService.setLoading(true);
    return this.http.post<any>(`${API_URL}/users`, data).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  updateUser(id: number, data: any) {
    this.loaderService.setLoading(true);
    return this.http.put<any>(`${API_URL}/users/${id}`, data).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  updateSelf(data: any) {
    this.loaderService.setLoading(true);
    return this.http.put<any>(`${API_URL}/users`, data).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  createDepartment(data: any) {
    this.loaderService.setLoading(true);
    return this.http.post<any>(`${API_URL}/departments`, data).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  updateDepartment(id: number, data: any) {
    this.loaderService.setLoading(true);
    return this.http.put<any>(`${API_URL}/departments/${id}`, data).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  deleteDepartment(id: number) {
    this.loaderService.setLoading(true);
    return this.http.delete<any>(`${API_URL}/departments/${id}`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  createLocation(data: any) {
    this.loaderService.setLoading(true);
    return this.http.post<any>(`${API_URL}/locations`, data).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  updateLocation(id: number, data: any) {
    this.loaderService.setLoading(true);
    return this.http.put<any>(`${API_URL}/locations/${id}`, data).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  deleteLocation(id: number) {
    this.loaderService.setLoading(true);
    return this.http.delete<any>(`${API_URL}/locations/${id}`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  createCompany(data: any) {
    this.loaderService.setLoading(true);
    return this.http.post<any>(`${API_URL}/companies`, data).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  updateCompany(id: number, data: any) {
    this.loaderService.setLoading(true);
    return this.http.put<any>(`${API_URL}/companies/${id}`, data).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  deleteCompany(id: number) {
    this.loaderService.setLoading(true);
    return this.http.delete<any>(`${API_URL}/companies/${id}`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  createLine(data: any) {
    this.loaderService.setLoading(true);
    return this.http.post<any>(`${API_URL}/lines`, data).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  updateLine(id: number, data: any) {
    this.loaderService.setLoading(true);
    return this.http.put<any>(`${API_URL}/lines/${id}`, data).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  deleteLine(id: number) {
    this.loaderService.setLoading(true);
    return this.http.delete<any>(`${API_URL}/lines/${id}`).pipe(
      finalize(() => this.loaderService.setLoading(false)),
    );
  }
}
