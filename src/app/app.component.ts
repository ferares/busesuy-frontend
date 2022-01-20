import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public updateAvailable = false;

  constructor(private swUpdate: SwUpdate) {}

  public ngOnInit(): void {
    this.swUpdate.available.subscribe(_ => this.updateAvailable = true);
  }

  public update(): void {
    this.swUpdate.activateUpdate().then(
      _ => document.location.reload()
    );
  }
}
