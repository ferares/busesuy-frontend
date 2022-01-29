import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient) { }

  getRandomImage(): any {
    return this.http.get<any>(`${IMAGES_URL}/random`).pipe(
      catchError((error: any) => of(this.fallback as any))
    );
  }
}
