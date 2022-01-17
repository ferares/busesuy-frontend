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
    return this.http.get<any>(`${API_URL}/locations`);
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
