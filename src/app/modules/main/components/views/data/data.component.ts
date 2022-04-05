import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
})
export class DataComponent {
  statuses: any = {
    'no': {
      label: $localize `Sin datos`,
      icon: 'fa-solid fa-ban',
    },
    'working': {
      label: $localize `En proceso de adquisición de datos`,
      icon: 'fa-solid fa-arrows-rotate',
    },
    'soon': {
      label: $localize `Próximamente`,
      icon: 'fa-solid fa-hourglass-empty',
    },
    'outdated': {
      label: $localize `Datos desactualizados`,
      icon: 'fa-solid fa-thumbs-down',
    },
    'ok': {
      label: $localize `Datos actualizados`,
      icon: 'fa-solid fa-thumbs-up',
    },
  };
  data: Array<any> = [
    {
      label: $localize `Interdepartamentales`,
      source: 'MTOP',
      status: 'ok',
    },
    {
      label: 'Área metropolitana de Montevideo',
      source: 'MTOP',
      status: 'soon',
    },
    {
      label: 'Artigas',
      source: 'Intendencia de Artigas',
      status: 'working',
    },
    {
      label: 'Canelones',
      source: 'Intendencia de Canelones',
      status: 'working',
    },
    {
      label: 'Cerro Largo',
      source: 'Intendencia de Cerro Largo',
      status: 'working',
    },
    {
      label: 'Colonia',
      source: 'Intendencia de Colonia',
      status: 'working',
    },
    {
      label: 'Durazno',
      source: 'Intendencia de Durazno',
      status: 'working',
    },
    {
      label: 'Flores',
      source: 'Intendencia de Flores',
      status: 'working',
    },
    {
      label: 'Florida',
      source: 'Intendencia de Florida',
      status: 'working',
    },
    {
      label: 'Lavalleja',
      source: 'Intendencia de Lavalleja',
      status: 'working',
    },
    {
      label: 'Maldonado',
      source: 'Intendencia de Maldonado',
      status: 'working',
    },
    {
      label: 'Paysandú',
      source: 'Intendencia de Paysandú',
      status: 'working',
    },
    {
      label: 'Río Negro',
      source: 'Intendencia de Río Negro',
      status: 'working',
    },
    {
      label: 'Rivera',
      source: 'Intendencia de Rivera',
      status: 'working',
    },
    {
      label: 'Rocha',
      source: 'Intendencia de Rocha',
      status: 'working',
    },
    {
      label: 'Salto',
      source: 'Intendencia de Salto',
      status: 'working',
    },
    {
      label: 'San José',
      source: 'Intendencia de San José',
      status: 'working',
    },
    {
      label: 'Soriano',
      source: 'Intendencia de Soriano',
      status: 'working',
    },
    {
      label: 'Tacuarembó',
      source: 'Intendencia de Tacuarembó',
      status: 'working',
    },
    {
      label: 'Treinta y Tres',
      source: 'Intendencia de Treinta y Tres',
      status: 'working',
    },
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle($localize `Datos | BusesUY`);
  }
}
