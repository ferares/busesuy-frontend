import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent {
  @Input() results: Array<any> = undefined as any;
  @Input() origin = '';
  @Input() destination = '';

  constructor() { }
}
