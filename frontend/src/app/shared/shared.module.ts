import { CommonModule } from '@angular/common';
import { PropertyService } from './services/property.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [PropertyService]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [PropertyService, ApiService]
    };
  }
}
