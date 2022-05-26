import { Component, Input, OnInit, AfterViewInit, ViewChildren, ChangeDetectorRef, TemplateRef } from '@angular/core';

import { combineLatest } from 'rxjs';

import { LineComponent } from '../../views/line/line.component';

import { ModalService } from '../../../../../services/modal.service';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
})
export class ResultsTableComponent implements OnInit {
  @Input() results: Array<any> = undefined as any;
  @Input() origin = '';
  @Input() destination = '';
  lineInfo: any = undefined as any;
  expanded: Array<Boolean> = [];

  constructor(private apiService: ApiService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.expanded = this.results.map((_: any) => false);
  }

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

  showLineInfoModal(id: string): void {
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
