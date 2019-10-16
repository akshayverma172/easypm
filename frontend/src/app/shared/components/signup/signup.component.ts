import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControlName,
  AbstractControl
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  validUsername: Boolean = false;
  private validationMessages: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.validationMessages = {
      username: {
        required: 'Username Is required.',
        minlength: 'Username must be atleast four characters'
      },
      password: {
        required: 'Password is required',
        minlength: 'Password must be atleast 5 characters'
      },
      confirmPassword: {
        required: 'Type the same password to confirm'
      }
    };
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    });

    const username = this.signupForm.get('username');
    this.checkUsername(username);

    const password = this.signupForm.get('password');
    this.comparePassword(password);
  }

  checkUsername(c: AbstractControl) {
    c.valueChanges.pipe(debounceTime(1000)).subscribe(val => {
      this.userService.findUserByUsername(val).subscribe(res => {
        if (res.result === 'ok') {
          this.validUsername = true;
        }
      });
    });
  }

  comparePassword(c: AbstractControl) {
    c.valueChanges.pipe(debounceTime(1000)).subscribe(val => {
      console.log(val);
    });
  }

  submit() {
    if (this.validUsername) {
      const username = this.signupForm.value.username;
      const password = this.signupForm.value.password;
      // console.log(username);
      this.userService.addUser(username, password).subscribe(result => {
        console.log(result);
      });
    }
  }
}
