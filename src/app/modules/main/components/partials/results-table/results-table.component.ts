import { Component, Input } from '@angular/core';

import { combineLatest } from 'rxjs';

import { ModalService } from '../../../../../services/modal.service';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
})
export class ResultsTableComponent {
  @Input() results: Array<any> = undefined as any;
  lineInfo: any = undefined as any;

  constructor(private apiService: ApiService, private modalService: ModalService) { }

  showCompanyInfoModal(id: number): void {
    // TODO: Move this into api service
    combineLatest([
      this.apiService.getCompanyById(id),
      this.apiService.getLinesByCompany(id),
    ]).subscribe((data: Array<any>) => {
      const [company, lines] = data;
      this.modalService.openModal('company', { company, lines });
    });
  }

  showLineInfoModal(id: number): void {
    // TODO: Move this into api service
    this.apiService.getLineById(id).subscribe(line => {
      combineLatest(
        [
          this.apiService.getCompanyById(line.companyId),
          this.apiService.getLocationById(line.originId),
          this.apiService.getLocationById(line.destinationId),
          this.apiService.getStopsByLine(line.id),
        ]
      ).subscribe(data => {
        const [company, origin, destination, stops] = data
        this.lineInfo = {
          line,
          company,
          origin,
          destination,
          stops,
        };
        this.modalService.openModal('line', this.lineInfo);
      });
    });
  }
}
