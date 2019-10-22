import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControlName,
  AbstractControl
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { Subscription, merge, Observable, fromEvent } from 'rxjs';
import { Validator } from '../../directive/validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { reject } from 'q';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  signupForm: FormGroup;

  private validationMessages: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {};
  private subscription: Subscription;

  private validator: Validator;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.validationMessages = {
      username: {
        required: 'Username Is required.',
        minlength: 'Username must be atleast four characters',
        invalid: 'Username already Exists'
      },
      password: {
        required: 'Password is required',
        minlength: 'Password must be atleast 5 characters'
      },
      confirmPassword: {
        required: 'This field is required',
        minlength: 'This must be same and atleast 5 characters',
        samePassword: 'Confirm Password must be same as Password'
      }
    };

    this.validator = new Validator(this.validationMessages);
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(4)],
        this.validUserNotTaken.bind(this)
      ],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: [
          '',
          [Validators.required, Validators.minLength(5)],
          this.validateConfirmPassword.bind(this)
        ]
      })
    });
  }

  ngAfterViewInit() {
    const blurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    this.subscription = merge(this.signupForm.valueChanges, ...blurs)
      .pipe(debounceTime(800))
      .subscribe(val => {
        this.displayMessage = this.validator.processMessages(this.signupForm);
      });
  }

  validUserNotTaken(c: AbstractControl) {
    return new Promise((resolve, reject) => {
      this.userService.findUserByUsername(c.value).subscribe(res => {
        if (res.result === 'ok') {
          resolve(null);
        } else {
          resolve({ invalid: true });
        }
      });
    });
  }

  validateConfirmPassword() {
    return new Promise((resolve, reject) => {
      const password = this.signupForm.get(['passwords', 'password']);
      const confirmPassword = this.signupForm.get([
        'passwords',
        'confirmPassword'
      ]);
      if (password.value !== confirmPassword.value) {
        resolve({ samePassword: true });
      } else {
        resolve(null);
      }
    });
  }

  submit() {
    if (this.signupForm.valid) {
      const username = this.signupForm.value.username;
      const password = this.signupForm.value.passwords.password;

      this.userService.addUser(username, password).subscribe(result => {
        this.toastService.success('Congratulations', 'Success');
        this.router.navigate(['login']);
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
