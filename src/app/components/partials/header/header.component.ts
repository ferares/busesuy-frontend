import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isCollapsed = true;
  currentUrl = '';
  linkCopied = false;

  constructor(private router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isCollapsed = true;
        this.currentUrl = event.url;
      }
    });
  }

  share(): void {
    if (navigator.share) {
      navigator.share({
        title: 'BusesUY',
        text: '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      this.linkCopied = true;
      setTimeout(() => {
        this.linkCopied = false;
      }, 3000);
    }
  }
}
