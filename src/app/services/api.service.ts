import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // These are used to indicate if the service is waiting for data from the API
  private loading = new Subject<boolean>();
  public loadingChange$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Updates the value of the "loading" varaible
   *
   * @param state The new value of the variable
   */
  public setLoading(state: boolean): void {
    this.loading.next(state);
  }

  getLocations() {
    this.setLoading(true);
    return this.http.get<any>(`${API_URL}/locations`).pipe(
      finalize(() => this.setLoading(false)),
    );
  }

  getLineByName(name: string) {
    this.setLoading(true);
    return this.http.get<any>(`${API_URL}/lines/${name}`).pipe(
      finalize(() => this.setLoading(false)),
    );
  }

  getLinesByCompany(name: string) {
    this.setLoading(true);
    return this.http.get<any>(`${API_URL}/companies/${name}/lines`).pipe(
      finalize(() => this.setLoading(false)),
    );
  }

  getCompanyByName(name: string) {
    this.setLoading(true);
    return this.http.get<any>(`${API_URL}/companies/${name}`).pipe(
      finalize(() => this.setLoading(false)),
    );
  }

  getDepartmentById(id: number) {
    this.setLoading(true);
    return this.http.get<any>(`${API_URL}/departments/${id}`).pipe(
      finalize(() => this.setLoading(false)),
    );
  }

  getLocationById(id: number) {
    this.setLoading(true);
    return this.http.get<any>(`${API_URL}/locations/${id}`).pipe(
      finalize(() => this.setLoading(false)),
    );
  }

  findRoutes(
    origin: String,
    originDepartment: String,
    destination: String,
    destinationDepartment: String,
    days: String,
  ) {
    this.setLoading(true);
    const params: any = {
      origin,
      originDepartment,
      destination,
      destinationDepartment,
      days,
    };
    return this.http.get<any>(`${API_URL}/lines/search`, { params }).pipe(
      finalize(() => this.setLoading(false)),
    );
  }
}
