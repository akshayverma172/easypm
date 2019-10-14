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
@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    NavMenuComponent,
    PropertiesComponent,
    AddPropertyComponent
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
