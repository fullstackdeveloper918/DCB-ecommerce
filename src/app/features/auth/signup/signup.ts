import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-signup',
  imports: [SharedModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
      // TODO: Handle API call here
    }
  }
}
