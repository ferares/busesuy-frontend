import { Component, Input } from '@angular/core';

import { CompanyData } from 'src/app/models/company-data.model';
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
    this.apiService.getCompanyDataById(id).subscribe((companyData: CompanyData) => {
      this.modalService.openModal('company', companyData);
    });
  }
}
