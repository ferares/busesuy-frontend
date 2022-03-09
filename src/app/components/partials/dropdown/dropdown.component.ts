import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
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
