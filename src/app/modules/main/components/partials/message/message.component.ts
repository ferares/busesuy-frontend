import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent {
  @Input() type = '';

  constructor() { }
}
