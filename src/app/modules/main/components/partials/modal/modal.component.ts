import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnChanges {
  @Output() closeEvent = new EventEmitter<boolean>();
  @Input() show = false;

  constructor() {
    this.closeOnEscape = this.closeOnEscape.bind(this)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['show']) && (changes['show'].currentValue === true)) {
      document.addEventListener('keydown', this.closeOnEscape);
    }
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
    document.removeEventListener('keydown', this.closeOnEscape);
  }

  closeOnEscape(event: any) {
    if (event.code === 'Escape') this.close();
  }
}
