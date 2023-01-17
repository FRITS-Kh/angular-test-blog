import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { FieldType } from '../shared/types';
import { FormUtil } from '../shared/form-util';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends FormUtil implements OnInit {
  form = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  submitted = false;
  message = '';

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please login';
      }

      if (params['authFailed']) {
        this.message = 'Session expired';
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      error: () => {
        this.submitted = false;
      },
    });
  }

  get emailField(): FieldType {
    return this.form.get('email');
  }
  get passwordField(): FieldType {
    return this.form.get('password');
  }
}
