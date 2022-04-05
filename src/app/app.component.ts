import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  public updateAvailable = false;
  swSubscription: Subscription = undefined as any;

  constructor(private swUpdate: SwUpdate) {}

  public ngOnInit(): void {
    this.swSubscription = this.swUpdate.available.subscribe(_ => this.updateAvailable = true);
  }

  public ngOnDestroy(): void {
    this.swSubscription.unsubscribe();
  }

  public update(): void {
    this.swUpdate.activateUpdate().then(
      _ => document.location.reload()
    );
  }
}
