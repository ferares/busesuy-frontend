import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  validated = false;
  error: string = '';
  success = false;
  sending = false;

  constructor(private authService: AuthService, private titleService: Title) {
    this.titleService.setTitle($localize `Ingresar | BusesUY`);
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
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

  submit(token: any): void {
    if (!this.form.valid) this.validated = true;
    else {
      const data = this.form.getRawValue();
      data.captcha = token;
      this.authService.login(data).subscribe(
        (res: any) => {
          this.success = res?.success;
          if (!this.success) this.error = $localize `Error interno, intente nuevamente más tarde`;
          else this.form.reset();
        },
        (err: any) => {
          this.error = $localize `Error interno, intente nuevamente más tarde`;
        },
      )
    }
    this.sending = false;
  }
}
