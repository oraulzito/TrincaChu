import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../state/user/user.service';
import {Router} from "@angular/router";
import {SessionQuery} from "../../../state/session/session.query";
import {SessionService} from "../../../state/session/session.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpLoading$ = false;
  error = false;
  form: FormGroup;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private sessionService: SessionService,
    private sessionQuery: SessionQuery
  ) {
    this.sessionQuery.selectLoading().subscribe(l => this.signUpLoading$ = l);
    this.form = this.fb.group({
      // personal info
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      // profile info
      email: new FormControl('', [Validators.required, this.userService.emailFormatCheck], [this.userService.checkEmail]),
      password: new FormControl('', [this.userService.checkPassword]),
    });

    this.form.addControl('repeatPassword', new FormControl('', [this.userService.checkPassword, this.confirmValidator]));
  }

  ngOnInit(): void {
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value === '') {
      this.error = true;
      return {required: true};
    } else if (control.value !== this.form.controls.password.value) {
      this.error = true;
      return {error: true};
    }
    this.error = false;
    return {};
  }

  submit(): void {
    this.userService.signup(this.form.value).subscribe(
      (r) => {
        this.loginForm = this.fb.group({
          // profile info
          email: new FormControl(this.form.controls.email.value),
          password: new FormControl(this.form.controls.password.value)
        });
        this.sessionService.login(this.loginForm.value).subscribe((r) => this.router.navigate(['events']));
      },
      () => this.error = true
    );
  }

  // tslint:disable-next-line:typedef
  back() {
    return this.router.navigate(['/']);
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {

  }
}
