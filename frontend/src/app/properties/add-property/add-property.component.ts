import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../../shared/services/property.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  propertyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.propertyForm = this.fb.group({
      name: ['test', Validators.required],
      address: ['124 elbern', Validators.required],
      floor: [' 2nd', Validators.required],
      number: ['123', Validators.required],
      rent: ['1500', Validators.required],
      vacant: ['yes', Validators.required]
    });
  }

  submit() {
    // console.log(this.propertyForm.value);

    const details = { ...this.propertyForm.value };
    // console.log(details);
    this.propertyService
      .addPropertyListing(this.propertyForm.value)
      .subscribe(result => {
        console.log(result);
      });
  }
}
