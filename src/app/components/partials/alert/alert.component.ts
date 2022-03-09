import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input('type') type = 'success';
  @Input('dismissible') dismissible = false;
  dismissed = false;

  constructor() { }

  close(): void {
    this.dismissed = true;
  }
}
