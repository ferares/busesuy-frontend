import { Injectable, ViewContainerRef } from '@angular/core';

import { ModalComponent } from '../components/partials/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  rootViewContainer!: ViewContainerRef;

  constructor() {}

  setRootViewContainerRef(viewContainerRef: any) {
    this.rootViewContainer = viewContainerRef;
  }

  createModal(contentRef: any, headerRef?: any) {
    const headerView = headerRef?.createEmbeddedView({});
    const contentView = contentRef.createEmbeddedView({});
    return this.rootViewContainer.createComponent(ModalComponent, {
      projectableNodes: [headerView?.rootNodes, contentView.rootNodes],
    });
  }

  updateModalContent(modal: any) {
    modal.destroy();
    console.log(modal);
  }
}
