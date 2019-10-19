import { CommonModule } from '@angular/common';
import { PropertyService } from './services/property.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  declarations: [LoginComponent, SignupComponent, LogoutComponent],
  providers: [PropertyService, AuthService, UserService]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [PropertyService, ApiService, AuthGuard]
    };
  }
}
