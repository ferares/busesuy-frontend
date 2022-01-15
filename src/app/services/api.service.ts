import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getLocations() {
    return this.http.get<any>(`${API_URL}/locations`);
  }

  findRoutes(
    origin: String,
    originDepartment: String,
    destination: String,
    destinationDepartment: String,
    date: String,
  ) {
    const params: any = {
      origin,
      originDepartment,
      destination,
      destinationDepartment,
      date,
    };
    return this.http.get<any>(`${API_URL}/lines/search`, { params });
  }
}
