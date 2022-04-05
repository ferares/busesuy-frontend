import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
})
export class AccordionComponent {
  show = false;

  constructor() { }

  close(): void {
    this.show = false;
  }

  open(): void {
    this.show = true;
  }

  toggle(): void {
    this.show = !this.show;
  }
}
