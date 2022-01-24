import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  form: FormGroup;
  validated = false;
  error: string = '';
  success = false;
  sending = false;

  constructor(private apiService: ApiService) {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    })
  }

  onClickSubmit(): void {
    this.sending = true;
    this.error = '';
    this.success = false;
    this.validated = false;
  }

  onCaptchaError(): void {
    this.error = 'Error de verificación de captcha';
  }

  submit(token: string): void {
    if (!this.form.valid) this.validated = true;
    else {
      const data = this.form.getRawValue();
      data.captcha = token;
      this.apiService.submitContact(data).subscribe(
        (res: any) => {
          this.success = res?.success;
          if (!this.success) this.error = 'Error interno, intente nuevamente más tarde';
          else this.form.reset();
        },
        (err: any) => {
          this.error = 'Error interno, intente nuevamente más tarde';
        },
      )
    }
    this.sending = false;
  }
}
