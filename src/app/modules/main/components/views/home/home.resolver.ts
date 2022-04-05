import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { combineLatest } from 'rxjs';

import { ApiService } from '../../../../../services/api.service';
import { ImagesService } from '../../../services/images.service';

@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(
    private apiService: ApiService,
    private imagesService: ImagesService,
  ) {}

  resolve(): any {
    return new Promise((resolve, reject) => {
      combineLatest([
        this.apiService.getLocations(),
        this.imagesService.getRandomImage(),
      ]).subscribe((data: Array<any>) => {
        const [locations, background] = data;
        const img = new Image();
        img.onload = () => resolve({ locations, background });
        img.onerror = () => resolve({ locations, background });
        img.src = background.picture;
      });
    })
  }
}
