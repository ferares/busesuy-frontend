import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Alert } from '../models/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new BehaviorSubject<Alert|null>(null);
  private defaultId = 'default-alert';

  onAlert(id = this.defaultId): Observable<Alert|null> {
    return this.subject.asObservable();
  }

  alert(type: string, message: string, autoClose: boolean) {
    const alert = new Alert({ type, message, autoClose })
    this.subject.next(alert);
  }
}