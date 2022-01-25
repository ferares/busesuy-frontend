import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {
  @Input() results: Array<any> = undefined as any;
  @Input() origin = '';
  @Input() destination = '';
  expanded: Array<Boolean> = [];

  constructor() { }

  ngOnInit(): void {
    this.expanded = this.results.map((_: any) => false);
  }
}
