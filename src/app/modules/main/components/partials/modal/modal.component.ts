import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() closeEvent = new EventEmitter<boolean>();
  show = false;

  constructor() {
    document.addEventListener('keydown', (event: any) => {
      if (event.code === 'Escape') this.close();
    });
  }

  handleContentClick(event: any) {
    event.stopPropagation();
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
    this.closeEvent.emit(true);
  }
}
