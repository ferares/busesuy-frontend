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

  showLineInfoModal(name: string): void {
    // TODO: Move this into api service
    this.apiService.getLineByName(name).subscribe(line => {
      combineLatest(
        [
          this.apiService.getLocationById(line.origin),
          this.apiService.getLocationById(line.destination),
        ]
      ).subscribe(locations => {
        const [origin, destination] = locations
        combineLatest(
          [
            this.apiService.getDepartmentById(origin.department),
            this.apiService.getDepartmentById(destination.department),
          ]
        ).subscribe(departments => {
          const [originDepartment, destinationDepartment] = departments
          this.lineInfo = {
            line: { ...line },
            origin: origin.name,
            originDepartment: originDepartment.name,
            destination: destination.name,
            destinationDepartment: destinationDepartment.name,
          };
          this.modalService.openModal('line', this.lineInfo);
        })
      });
    });
  }
}
