import { Component, Input, OnInit, AfterViewInit, ViewChildren, ChangeDetectorRef, TemplateRef } from '@angular/core';

import { combineLatest } from 'rxjs';

import { LineComponent } from '../../views/line/line.component';

import { ModalService } from '../../../services/modal.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit, AfterViewInit {
  @Input() results: Array<any> = undefined as any;
  @Input() origin = '';
  @Input() destination = '';
  @ViewChildren('lineInfoTemplate') lineInfoTemplate!: any;
  lineInfoModal: any;
  lineInfo: any = undefined as any;
  expanded: Array<Boolean> = [];

  constructor(private apiService: ApiService, private modalService: ModalService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.expanded = this.results.map((_: any) => false);
  }

  ngAfterViewInit(): void {
    console.log(this.lineInfoTemplate);
    // console.log(this.lineInfoTemplate.first);
    this.lineInfoTemplate.changes.subscribe(() => {
      setTimeout(() => {
        console.log(this.lineInfoTemplate.first);
        this.lineInfoModal = this.modalService.createModal(this.lineInfoTemplate.first);
      }, 0);
    });
  }

  // @ViewChildren('lineInfoTemplate')
  // set lineInfoTemplate(component: any) {
  //   console.log(component);
  //   if (component.first) {
  //     setTimeout(() => {
  //       this.lineInfoModal = this.modalService.createModal(component.first);
  //     }, 0);
  //     // this.changeDetector.detectChanges();
  //   }
  // }

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
          // this.lineInfoModal = this.modalService.createModal(this.lineInfoTemplate);
          // this.changeDetector.detectChanges();
          // TODO: Destroy modal on close
        })
      });
    });
  }
}
