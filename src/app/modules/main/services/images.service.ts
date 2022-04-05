import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of, finalize } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoaderService } from '../../../services/loader.service';

import { environment } from '../../../../environments/environment';

const IMAGES_URL = environment.imagesURL;

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  fallback = {
    picture: '/assets/imgs/bgs/beach.jpg',
    location: 'La Paloma, Rocha',
    user: {
      name: 'Ferares',
      link: 'https://github.com/ferares',
    },
  };

  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  getRandomImage(): any {
    return this.http.get<any>(`${IMAGES_URL}/random`).pipe(
      catchError((error: any) => of(this.fallback as any))
    );
  }

  submitImages(data: any): any {
    this.loaderService.setLoading(true);
    return this.http.post<any>(`${IMAGES_URL}/new`, data).pipe(
      finalize(() => this.loaderService.setLoading(false))
    );
  }
}
