import { Component, Input } from '@angular/core';

import { combineLatest } from 'rxjs';

import { Company } from 'src/app/models/company.model';
import { Line } from 'src/app/models/line.model';
import { Stop } from 'src/app/models/stop.model';

import { ApiService } from '../../../../../services/api.service';
import { ModalService } from '../../../../../services/modal.service';

class LineData {
  line!: Line;
  company!: Company;
  origin!: Location;
  destination!: Location;
  stops!: Array<Stop>;
}

@Component({
  selector: 'app-line-data',
  templateUrl: './line-data.component.html',
})
export class LineDataComponent {
  @Input('data') data! : LineData;
  constructor(private apiService: ApiService, private modalService: ModalService) {}

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
}
