import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPropertyComponent } from './properties/add-property/add-property.component';
import { PropertiesComponent } from './properties/properties.component';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component';
import { ShellComponent } from './shared/components/shell/shell.component';
import { SharedModule } from './shared/shared.module';
import { PropertyDetailComponent } from './properties/property-detail/property-detail.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EasypmHttpInterceptor } from './shared/services/easypm-http-header';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageInfoComponent } from './shared/components/page-info/page-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    NavMenuComponent,
    PropertiesComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    PageInfoComponent
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        whitelistedDomains: [environment.BACKEND_API],
        blacklistedRoutes: [environment.BACKEND_API + 'api']
      }
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: EasypmHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
