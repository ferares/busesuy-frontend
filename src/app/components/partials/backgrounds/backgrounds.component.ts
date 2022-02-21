import { Component } from '@angular/core';

import { ImagesService } from '../../../services/images.service';

@Component({
  selector: 'app-backgrounds',
  templateUrl: './backgrounds.component.html',
  styleUrls: ['./backgrounds.component.scss']
})
export class BackgroundsComponent {
  name = '';
  link = '';
  locations: Array<any> = [];
  validated = false;
  error: string = '';
  success = false;
  sending = false;

  constructor(private imagesService: ImagesService) {
    this.addLocation();
  }

  onClickSubmit(): void {
    this.sending = true;
    this.error = '';
    this.success = false;
    this.validated = false;
  }

  onCaptchaError(): void {
    this.error = $localize `Error de verificación de captcha`;
  }

  updatePicturesLocation(index: number, event: any): void {
    this.locations[index].pictures = event.target.files;
  }

  addLocation(): void {
    this.locations.push({
      name: '',
      pictures: [],
      success: undefined,
      error: '',
    });
  }

  removeLocation(index: number): void {
    this.locations.splice(index, 1);
  }

  validForm(): boolean {
    if (!this.locations.length) return false;
    for (const location of this.locations) {
      if ((!location.name) || (!location.pictures.length)) return false;
    }
    return true;
  }

  async submitLocation(data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this.imagesService.submitImages(data).subscribe(
        (res: any) => resolve(res?.success),
        () => resolve(false),
      );
    })
  }

  async submit(captcha: string) {
    this.validated = true;
    let totalSuccess = 0;
    if (this.validForm()) {
      this.validated = false;
      for (const location of this.locations) {
        if (location.success) {
          totalSuccess++;
          continue;
        }
        const data = new FormData();
        data.append('name', this.name);
        data.append('link', this.link);
        data.append('captcha', captcha);
        data.append('location', location.name);
        for (const file of location.pictures) {
          data.append('pictures[]', file);
        }
        location.success = await this.submitLocation(data);
        if (location.success) {
          totalSuccess++;
        } else {
          location.error = $localize `Error interno, intente nuevamente más tarde`;
        }
      }
    }
    if (totalSuccess === this.locations.length) {
      this.error = '';
      this.success = true;
      this.name = '';
      this.link = '';
      this.locations = [];
      this.addLocation();
    }
    this.sending = false;
  }
}
