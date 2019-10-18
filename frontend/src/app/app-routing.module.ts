import { Route, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './properties/add-property/add-property.component';
import { PropertiesComponent } from './properties/properties.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { PropertyDetailComponent } from './properties/property-detail/property-detail.component';
import { LogoutComponent } from './shared/components/logout/logout.component';

const routes: Route[] = [
  {
    path: 'properties',
    component: PropertiesComponent
  },
  { path: 'properties/:id', component: PropertyDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'addproperty',
    component: AddPropertyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
