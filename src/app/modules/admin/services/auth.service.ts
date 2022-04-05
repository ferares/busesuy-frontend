import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, finalize, tap, catchError, of, map } from 'rxjs';

import { LoaderService } from '../../../services/loader.service';

import { environment } from '../../../../environments/environment';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private refreshIntervalTime = 300000;
  private refreshInterval: any;
  // These are used to indicate changes in a user's logged in status
  private loggedIn = new Subject<boolean>();
  public loggedInChange$: Observable<boolean> = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
  ) { }

  /**
   * Saves user data to local storage
   */
  private storeUser(data: any) {
    localStorage['user'] = data;
  }

  /**
   * Gets user data from local storage
   */
  public getUser() {
    return localStorage['user'];
  }

  /**
   * Removes user data from local storage
   */
  private clearUser() {
    delete localStorage['user'];
  }

  /**
   * Indicates if a user is logged in
   */
  public isLoggedIn(): boolean {
    return !!this.getUser();
  }

  /**
   * Log a user in
   * @param email - Email of the user.
   * @param password - Password of the user.
   * @return Observable.
   */
  public login(data: any): Observable<any> {
    this.loaderService.setLoading(true);
    const options = {
      withCredentials: true,
      observe: 'response' as 'response'
    };

    return this.http.post<any>(`${API_URL}/users/login`, data, options).pipe(
      tap((res: any) => {
        // Logout on login failure just in case
        if (!res.body.success) return this.logout();
        // Store the user's login data
        this.storeLogin({ id: res.body.id, admin: res.body.admin });
        // Call the refresh login function after the "refreshIntervalTime" has passed
        setTimeout(() => this.refreshLogin().subscribe(), this.refreshIntervalTime);
      }),
      catchError((error: any) => {
        // Logout on error just in case
        this.logout();
        if (error.status === 401) return of(false);
        throw error;
      }),
      // Extract the body from the response
      map((res: any) => res.body),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  /**
   * Stores the user's login data
   */
  private storeLogin(data: any) {
    this.storeUser(data);
    this.loggedIn.next(true);
  }

  /**
   * Logs out
   */
  public logout() {
    this.clearLogin();
    this.loggedIn.next(false);
  }

  /**
   * Stop refreshing user credentials every X seconds
   */
  public clearLogin() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = undefined;
    }
    this.clearUser();
  }

  /**
   * Refersh user credentials
   */
  public refreshLogin(): Observable<any> {
    const options = {
      withCredentials: true,
      observe: 'response' as 'response'
    };
    return this.http.post<any>(`${API_URL}/users/refresh`, {}, options).pipe(
      tap((res: any) => {
        if (res.body.success) {
          // Update the user's login data
          this.storeLogin({ id: res.body.id, admin: res.body.admin });
          // Call the refresh function again after "refreshIntervalTime"
          if (!this.refreshInterval) {
            this.refreshInterval = setInterval(
              () => this.refreshLogin().subscribe(),
              this.refreshIntervalTime
            );
          }
        }
        else this.logout(); // Logout on failure
      }),
      catchError((error: any) => {
        // Logout on failure
        this.logout();
        if (error.status === 401) return of(false);
        throw error;
      })
    );
  }
}
