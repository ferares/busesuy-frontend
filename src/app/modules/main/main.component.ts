import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'main-root',
  templateUrl: './main.component.html',
})
export class MainComponent {
  langs: Array<any> = [];
  currentLang: any = undefined as any;

  constructor(private route: ActivatedRoute, private router: Router) {
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
    if (hostnameParts[0].length === 2) {
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
}
