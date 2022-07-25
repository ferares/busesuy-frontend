import { Component, Input } from '@angular/core';

import { LineData } from 'src/app/models/line-data.model';

import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
})
export class ResultsTableComponent {
  @Input() results: Array<any> = undefined as any;
  showLineInfoModal = false;
  lineData: any;

  constructor(private apiService: ApiService) { }

  loadLineInfoModal(id: number): void {
    this.apiService.getLineDataById(id).subscribe((lineData: LineData) => {
      this.lineData = lineData;
      this.showLineInfoModal = true;
    });
  }

  lineInfoModalClose() {
    this.showLineInfoModal = false;
  }
}
