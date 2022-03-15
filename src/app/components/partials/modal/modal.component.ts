import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  show = true;

  constructor() {
    document.addEventListener('keydown', (event: any) => {
      if (event.code === 'Escape') this.close();
    });
  }

  handleContentClick(event: any) {
    event.stopPropagation();
  }

  close() {
    this.show = false;
  }
}
