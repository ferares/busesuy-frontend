import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public updateAvailable = false;
  langs: Array<any> = [];
  currentLang: any = undefined as any;

  constructor(
    private swUpdate: SwUpdate,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.setBaseUrls();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.updateHreflangs();
      }
    });
    this.route.queryParams.subscribe(() => this.updateHreflangs());
  }

  setBaseUrls(): void {
    const { hostname, protocol } = window.location;
    const hostnameParts = hostname.split('.');
    let host = `${hostname}`;
    let current = 'es';
    if (hostnameParts.length === 3) {
      host = `${hostnameParts[1]}.${hostnameParts[2]}`;
      current = hostnameParts[0];
    }
    this.langs.push({
      label: 'Español',
      name: 'es',
      url: `${protocol}//${host}`,
      flag: 'assets/imgs/uy.svg',
    });
    this.langs.push({
      label: 'English',
      name: 'en',
      url: `${protocol}//en.${host}`,
      flag: 'assets/imgs/gb.svg',
      });
    this.langs.push({
      label: 'Português',
      name: 'pt',
      url: `${protocol}//pt.${host}`,
      flag: 'assets/imgs/br.svg',
    });
    this.currentLang = this.langs.find(lang => lang.name === current);
  }

  updateHreflangs(): void {
    const { pathname, search } = window.location;
    for (const lang of this.langs) {
      const { name, url } = lang;
      const linkElement = document.querySelector(`[hreflang="${name}"]`) || document.createElement('link');
      linkElement.setAttribute('rel', 'alternate');
      linkElement.setAttribute('hreflang', name);
      linkElement.setAttribute('href', `${url}${pathname}${search}`);
      document.head.appendChild(linkElement);
    }
  }

  public ngOnInit(): void {
    this.swUpdate.available.subscribe(_ => this.updateAvailable = true);
  }

  public update(): void {
    this.swUpdate.activateUpdate().then(
      _ => document.location.reload()
    );
  }
}
