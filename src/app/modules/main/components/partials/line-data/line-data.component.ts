import { Component, Input } from '@angular/core';

import { combineLatest } from 'rxjs';

import { ApiService } from '../../../services/api.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-line-data',
  templateUrl: './line-data.component.html',
})
export class LineDataComponent {
  @Input('data') data!: any;
  constructor(private apiService: ApiService, private modalService: ModalService) {}

  showCompanyInfoModal(name: string): void {
    // TODO: Move this into api service
    combineLatest([
      this.apiService.getCompanyByName(name),
      this.apiService.getLinesByCompany(name),
    ]).subscribe((data: Array<any>) => {
      const [company, dataLines] = data;
      const promises = [];
      const locations: Array<any> = [];
      const lines = dataLines.map((line: any) => { return { ...line } });
      for (const line of lines) {
        if (!locations.includes(line.origin)) {
          locations.push(line.origin);
          promises.push(this.apiService.getLocationById(line.origin));
        }
        if (!locations.includes(line.destination)) {
          locations.push(line.destination);
          promises.push(this.apiService.getLocationById(line.destination));
        }
      }
      combineLatest(promises).subscribe((dataLocations: Array<any>) => {
        const promises = [];
        const departments: Array<any> = [];
        const locations = dataLocations.map(
          (location: any) => { return { ...location } }
        );
        for (const location of locations) {
          if (!departments.includes(location.department)) {
            departments.push(location.department);
            promises.push(this.apiService.getDepartmentById(location.department));
          }
        }
        combineLatest(promises).subscribe((departments: Array<any>) => {
          for (const location of locations) {
            location.department = departments.find(
              department => department.id === location.department
            ).name;
          }
          for (const line of lines) {
            line.origin = locations.find(
              location => location.id === line.origin
            );
            line.destination = locations.find(
              location => location.id === line.destination
            );
          }
          this.modalService.openModal('company', { company, lines });
        });
      });
    });
  }
}
