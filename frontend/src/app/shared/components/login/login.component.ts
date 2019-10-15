import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['user', Validators.required],
      password: ['password', Validators.required]
    });
  }

  submit() {
    // console.log(this.loginForm.value);
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(result => {
      console.log(result, 'mera loda');
    });
  }
}
