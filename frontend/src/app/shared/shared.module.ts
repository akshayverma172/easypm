import { CommonModule } from '@angular/common';
import { PropertyService } from './services/property.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [LoginComponent, SignupComponent],
  providers: [PropertyService]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [PropertyService, ApiService, AuthGuard]
    };
  }
}
