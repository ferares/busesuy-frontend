import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modals: BehaviorSubject<any> = new BehaviorSubject({ line: {}, company: {} } as any);

  openModal(name: string, content: any): void {
    this.modals.next({
      ...this.modals.value,
      [name]: {
        open: true,
        content: content,
      },
    });
  }
}
