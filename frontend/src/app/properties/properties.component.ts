import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../shared/services/property.service';
import { Property } from '../shared/model/property';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: Property[];

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.getPropertyListings().subscribe(props => {
      this.properties = props;
    });
  }
}
