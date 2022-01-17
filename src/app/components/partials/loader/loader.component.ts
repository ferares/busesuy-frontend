import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  active = false;
  subscription: Subscription = undefined as any;

  constructor(private apiService: ApiService) { }

  public ngOnInit(): void {
    // Subscribe to the loading state of the ApiService
    this.subscription = this.apiService.loadingChange$.subscribe(
      loading => this.active = loading // Update the "active" flag of the loader
    );
  }

  public ngOnDestroy(): void {
    // Delete the subscription
    this.subscription.unsubscribe();
  }

}
