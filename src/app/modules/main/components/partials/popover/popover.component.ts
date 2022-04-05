import { Component } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
})
export class PopoverComponent {
  show = false;

  constructor() {
    document.addEventListener('keydown', (event: any) => {
      if (event.code === 'Escape') this.close();
    });
  }

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
