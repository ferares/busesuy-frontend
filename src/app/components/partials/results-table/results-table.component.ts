import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { combineLatest } from 'rxjs';

import { ModalComponent } from '../modal/modal.component';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {
  @Input() results: Array<any> = undefined as any;
  @Input() origin = '';
  @Input() destination = '';
  @ViewChild('lineInfoModal') private lineInfoModal!: ModalComponent;
  lineInfo: any = undefined as any;
  expanded: Array<Boolean> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.expanded = this.results.map((_: any) => false);
  }

  getLineInfo(name: string): void {
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
          console.log(this.lineInfo);
          this.lineInfoModal.open();
        })
      });
    });
  }
}
