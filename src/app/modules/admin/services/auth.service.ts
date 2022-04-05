import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, finalize, tap } from 'rxjs';

import { LoaderService } from '../../../services/loader.service';

import { environment } from '../../../../environments/environment';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // These are used to indicate if a user is logged in
  private loggedIn = new Subject<boolean>();
  public loggedInChange$: Observable<boolean> = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
  ) { }

  /**
   * Log a user in
   * @param email - Email of the user.
   * @param password - Password of the user.
   * @return Observable.
   */
  public login(data: any): Observable<any> {
    this.loaderService.setLoading(true);

    return this.http.post<any>(`${API_URL}/users/login`, data).pipe(
      tap(() => this.loggedIn.next(true)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }
}
