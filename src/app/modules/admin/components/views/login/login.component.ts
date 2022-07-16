import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: UntypedFormGroup;
  validated = false;
  error: string = '';
  success = false;
  sending = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private titleService: Title,
  ) {
    this.titleService.setTitle($localize `Ingresar | BusesUY`);
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('admin@buses.uy', Validators.required),
      password: new UntypedFormControl('testing', Validators.required),
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
    this.sending = false;
  }

  submit(token: any): void {
    if (!this.form.valid) this.validated = true;
    else {
      const data = this.form.getRawValue();
      data.captcha = token;
      this.authService.login(data).subscribe(
        (res: any) => {
          this.success = res?.success;
          if (this.success) return this.router.navigate(['admin']);
          const message = $localize `Error interno, intente nuevamente más tarde`;
          return this.alertService.alert('error', message, true);
        },
        (error: any) => {
          let message = $localize `Error interno, intente nuevamente más tarde`;
          if (error.status === 403) message = $localize `Correo electrónico o contraseña incorrectos`
          this.alertService.alert('error', message, true);
        },
      )
    }
    this.sending = false;
  }
}
