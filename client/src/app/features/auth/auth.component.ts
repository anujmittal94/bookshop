import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@ebs.com')],
    ],
    password: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.loginUser(this.loginForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
