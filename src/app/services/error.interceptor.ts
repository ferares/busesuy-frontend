import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  private handleError(error: HttpErrorResponse) {
    let message = ''
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      message = 'Could not connect to the remote server.';
      if (isDevMode()) {
        console.error('A client-side or network error occurred:', error);
      }
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      message = `Error ${error.status}: ${error.error}`;
      if (isDevMode()) {
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(message));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(this.handleError));
  }
}
