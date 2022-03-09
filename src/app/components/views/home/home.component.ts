import { Component, AfterContentInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { getLocationString } from '../../../utils';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterContentInit, AfterViewInit {
  @ViewChild('resultsElement') private resultsElement: any;
  @ViewChild('originElement') private originElement: any;
  @ViewChild('originOptions') private originOptions: any;
  @ViewChild('destinationOptions') private destinationOptions: any;
  background: any = undefined as any;
  validated = false;
  locations: any;
  results: Array<any> = undefined as any;
  indirectResults: Array<any> = undefined as any;
  resultsOrigin = '';
  resultsDestination = '';
  origin = '';
  destination = '';
  selectedDays: Array<string> = [];
  days = [
    {
      label:  $localize `Lunes`,
      value: 'lu',
    },
    {
      label:  $localize `Martes`,
      value: 'ma',
    },
    {
      label:  $localize `Miércoles`,
      value: 'mi',
    },
    {
      label:  $localize `Jueves`,
      value: 'ju',
    },
    {
      label:  $localize `Viernes`,
      value: 'vi',
    },
    {
      label:  $localize `Sábado`,
      value: 'sa',
    },
    {
      label:  $localize `Domingo`,
      value: 'do',
    },
    {
      label:  $localize `Feriados`,
      value: 'fe',
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('BusesUY');
    this.background = route.snapshot.data['data']['background'];
    this.locations = route.snapshot.data['data']['locations'];
  }

  ngAfterViewInit(): void {
    this.originElement?.nativeElement.focus();
  }

  ngAfterContentInit(): void {
    this.route.queryParams.subscribe(params => {
      const origin = decodeURIComponent(params['origen'] || '');
      const originDepartment = decodeURIComponent(params['departmentoOrigen'] || '');
      const destination = decodeURIComponent(params['destino'] || '');
      const destinationDepartment = decodeURIComponent(params['departmentoDestino'] || '');
      const days = decodeURIComponent(params['dias'] || '');

      this.origin = getLocationString(origin, originDepartment);
      this.destination = getLocationString(destination, destinationDepartment);

      if (days) {
        this.selectedDays = days.split(',');
      }

      if ((this.origin) && (this.destination)) {
        this.titleService.setTitle(`${this.origin} -> ${this.destination} | BusesUY`);
        this.search();
      } else {
        this.results = undefined as any;
        this.indirectResults = undefined as any;
        this.validated = false;
      }
    });
  }

  getSelectedDaysString(): string {
    if (!this.selectedDays.length) return $localize `Cualquier día`
    let selectedDaysLabels = []
    for (const dayValue of this.selectedDays) {
      const day = this.days.find(day => day.value === dayValue)
      selectedDaysLabels.push(day?.label)
    }
    return selectedDaysLabels.join(', ')
  }

  toggleDay(event: Event, day: string): void {
    event.preventDefault();
    event.stopPropagation();
    const index = this.selectedDays.indexOf(day);
    if (index > -1) this.selectedDays.splice(index, 1);
    else this.selectedDays.push(day);
  }

  swapLocations(): void {
    const tmpOrigin = this.origin;
    this.origin = this.destination;
    this.destination = tmpOrigin;
  }

  validate(): boolean {
    this.validated = true;
    return ((!!this.origin) && (!!this.destination));
  }

  search(): void {
    if (this.validate()) {
      const originArray = this.origin.split(', ')
      const originDepartment = originArray[1]
      const origin = originArray[0]
      const destinationArray = this.destination.split(', ')
      const destinationDepartment = destinationArray[1]
      const destination = destinationArray[0]

      const queryParams = {
        origen: encodeURIComponent(origin),
        departmentoOrigen: encodeURIComponent(originDepartment),
        destino: encodeURIComponent(destination),
        departmentoDestino: encodeURIComponent(destinationDepartment),
        dias: encodeURIComponent(this.selectedDays.join(',')),
      };

      this.router.navigate(
        ['.'],
        {
          queryParams: queryParams,
          queryParamsHandling: 'merge',
        },
      );

      this.apiService.findRoutes(
        origin,
        originDepartment,
        destination,
        destinationDepartment,
        this.selectedDays.join(','),
      ).subscribe(
        (results: Array<any>) => {
          this.results = results.filter(
            (result: any) => !(Array.isArray(result))
          );
          this.indirectResults = results.filter(
            (result: any) => Array.isArray(result)
          );
          this.resultsOrigin = this.origin;
          this.resultsDestination = this.destination;
          // Set timeout to allow results to render (needed on first load)
          setTimeout(() => {
            this.resultsElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
          }, 1);
        }
      )
    }
  }
}
