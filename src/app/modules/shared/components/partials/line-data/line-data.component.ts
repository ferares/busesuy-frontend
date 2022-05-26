import { Component, Input } from '@angular/core';

import { combineLatest } from 'rxjs';

import { ApiService } from '../../../../../services/api.service';
import { ModalService } from '../../../../../services/modal.service';

@Component({
  selector: 'app-line-data',
  templateUrl: './line-data.component.html',
})
export class LineDataComponent {
  @Input('data') data!: any;
  constructor(private apiService: ApiService, private modalService: ModalService) {}

  showCompanyInfoModal(id: string): void {
    // TODO: Move this into api service
    combineLatest([
      this.apiService.getCompanyById(id),
      this.apiService.getLinesByCompany(id),
    ]).subscribe((data: Array<any>) => {
      const [company, lines] = data;
      this.modalService.openModal('company', { company, lines });
    });
  }
}
