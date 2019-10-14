import { Route, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './properties/add-property/add-property.component';
import { PropertiesComponent } from './properties/properties.component';

const routes: Route[] = [
  {
    path: 'properties',
    component: PropertiesComponent
  },
  { path: 'addproperty', component: AddPropertyComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
