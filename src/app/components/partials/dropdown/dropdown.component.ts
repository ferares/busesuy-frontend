import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input('dropdown-id') id = '';
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
