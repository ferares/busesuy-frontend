import { Component, AfterContentInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { ImagesService } from '../../../services/images.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterContentInit, AfterViewInit {
  @ViewChild('resultsElement') private resultsElement: any;
  @ViewChild('originElement') private originElement: any;
  background: any = undefined as any;
  validated = false;
  locations: Array<any>;
  results: Array<any> = undefined as any;
  indirectResults: Array<any> = undefined as any;
  resultsOrigin = '';
  resultsDestination = '';
  origin = '';
  destination = '';
  selectedDays: Array<string> = [];
  days = [
    {
      label: 'Lunes',
      value: 'lu',
    },
    {
      label: 'Martes',
      value: 'ma',
    },
    {
      label: 'Miércoles',
      value: 'mi',
    },
    {
      label: 'Jueves',
      value: 'ju',
    },
    {
      label: 'Viernes',
      value: 'vi',
    },
    {
      label: 'Sábado',
      value: 'sa',
    },
    {
      label: 'Domingo',
      value: 'do',
    },
    {
      label: 'Feriados',
      value: 'fe',
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private imagesService: ImagesService,
  ) {
    this.imagesService.getRandomImage().subscribe((image: any) => {
      this.background = image;
    });
    this.locations = route.snapshot.data['locations'].map(
      (location: any) => this.getLocationString(location.name, location.department.name)
    );
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

      this.origin = this.getLocationString(origin, originDepartment);
      this.destination = this.getLocationString(destination, destinationDepartment);

      if (days) {
        this.selectedDays = days.split(',');
      }

      if ((this.origin) && (this.destination)) this.search();
      else {
        this.results = undefined as any;
        this.indirectResults = undefined as any;
        this.validated = false;
      }
    });
  }

  getLocationString(locationName: string, departmentName: string): string {
    if ((!locationName) || (!departmentName)) return '';
    return `${locationName}, ${departmentName}`;
  }

  getSelectedDaysString(): string {
    if (!this.selectedDays.length) return 'Cualquier día'
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
