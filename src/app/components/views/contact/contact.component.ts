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

  constructor(private apiService: ApiService) {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    })
  }

  submit(): void {
    const data = this.form.getRawValue();
    this.apiService.submitContact(data)
  }
}
