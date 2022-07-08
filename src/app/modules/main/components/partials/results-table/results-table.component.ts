import { Component, Input } from '@angular/core';

import { CompanyData } from 'src/app/models/company-data.model';
import { LineData } from 'src/app/models/line-data.model';

import { ModalService } from '../../../../../services/modal.service';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
})
export class ResultsTableComponent {
  @Input() results: Array<any> = undefined as any;

  constructor(private apiService: ApiService, private modalService: ModalService) { }

  showCompanyInfoModal(id: number): void {
    this.apiService.getCompanyDataById(id).subscribe((companyData: CompanyData) => {
      this.modalService.openModal('company', companyData);
    });
  }

  showLineInfoModal(id: number): void {
    this.apiService.getLineDataById(id).subscribe((lineData: LineData) => {
      this.modalService.openModal('line', lineData);
    });
  }
}
