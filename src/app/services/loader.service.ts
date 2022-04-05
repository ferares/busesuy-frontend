import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // These are used to indicate if the service is waiting for data from the API
  private loading = new Subject<boolean>();
  public loadingChange$: Observable<boolean> = this.loading.asObservable();

  constructor() { }

  /**
   * Updates the value of the "loading" varaible
   *
   * @param state The new value of the variable
   */
  public setLoading(state: boolean): void {
    this.loading.next(state);
  }
}
