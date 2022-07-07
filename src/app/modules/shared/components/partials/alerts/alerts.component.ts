import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from '../../../../../models/alert.model';
import { AlertService } from '../../../../../services/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class AlertsComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  alertSubscription: Subscription | undefined;
  routeSubscription: Subscription | undefined;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertSubscription = this.alertService.onAlert()
      .subscribe((alert) => {
        if (!alert?.message) {
          this.alerts = [];
          return;
        }

        this.alerts.push(alert);

        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 5000);
        }
      }
    );
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;
    this.alerts = this.alerts.filter((alert) => alert !== alert);
  }
}