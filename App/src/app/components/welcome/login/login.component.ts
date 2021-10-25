import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../../../state/session/session.service';
import {SessionQuery} from '../../../state/session/session.query';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loadingLogin$ = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private sessionQuery: SessionQuery,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.sessionQuery.selectLoading().subscribe(r => this.loadingLogin$ = r);

    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.sessionService.login(this.loginForm.value).subscribe(
        (r) => {
          this.router.navigate(['events']);
        },
        (e) => {
          this.error = true;
        },
        () => {
        }
      );
    }
  }

}
