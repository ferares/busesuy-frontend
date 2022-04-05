import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { LoaderService } from '../../../../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit, OnDestroy {
  active = false;
  subscription: Subscription = undefined as any;

  constructor(private loaderService: LoaderService) { }

  public ngOnInit(): void {
    // Subscribe to the loading state of the LoaderService
    this.subscription = this.loaderService.loadingChange$.subscribe(
      loading => this.active = loading // Update the "active" flag of the loader
    );
  }

  public ngOnDestroy(): void {
    // Delete the subscription
    this.subscription.unsubscribe();
  }

}
