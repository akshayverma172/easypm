import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiClientModule } from './api/client/api-client.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ApiClientModule.forRoot(), SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
