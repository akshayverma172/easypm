import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../shared/model/property';
import { PropertyService } from '../../shared/services/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  property: Property;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    this.getPropertyDetails(param);
  }

  getPropertyDetails(id: string) {
    const query = { _id: id };
    this.propertyService.getPropertyListings(query).subscribe(result => {
      this.property = result[0];
      console.log(this.property);
    });
  }
}
