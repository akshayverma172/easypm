import { Component, OnInit } from '@angular/core';

// import { Property, PropertyService } from './api/client/properties/property.service';
import { Property } from './shared/model/property';
import { PropertyService } from './shared/services/property.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Easy Property Management';

  // properties: Property[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    // this.loadProperties();
  }

  // loadProperties() {
  //   this.propertyService.getPropertyListings().subscribe(properties => {
  //     this.properties = properties;
  //   });
  // }
}
