import {
  Component,
  OnInit,
  ElementRef,
  ViewChildren,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControlName
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Validator } from '../../directive/validator';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  displayMessage: { [key: string]: string } = {};
  loginForm: FormGroup;
  loginError: string;
  private subscription: Subscription;
  private validationMessages: { [key: string]: { [key: string]: string } };
  private validator: Validator;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.validationMessages = {
      username: {
        required: 'Username is required to Login',
        minlength: 'Username must be minimum 4 characters'
      },
      password: {
        required: 'Password is required to Login',
        minlength: 'Password must be minimum 4 characters'
      }
    };
    this.validator = new Validator(this.validationMessages);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngAfterViewInit() {
    const blurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    this.subscription = merge(this.loginForm.valueChanges, ...blurs)
      .pipe(debounceTime(1000))
      .subscribe(val => {
        this.displayMessage = this.validator.processMessages(this.loginForm);
      });
  }
  submit() {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(result => {
      if (result) {
        this.router.navigate(['addproperty']);
        this.toastService.success('Loggin in', 'Status');
      } else {
        this.loginError = 'Wrong Username or Password';
        this.toastService.error('Invalid Credentials', 'Status');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
