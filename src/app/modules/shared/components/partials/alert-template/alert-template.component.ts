import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-template',
  templateUrl: './alert-template.component.html',
})
export class AlertTemplateComponent {
  @Input('type') type = 'success';
  @Input('dismissible') dismissible = false;
  @Output() closeEvent = new EventEmitter<boolean>();
  dismissed = false;

  constructor() { }

  close(): void {
    this.dismissed = true;
    this.closeEvent.emit(true);
  }
}
