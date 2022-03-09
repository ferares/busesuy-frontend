import { Component } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
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
