import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  propertyForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.propertyForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      floor: ['', Validators.required],
      number: ['', Validators.required],
      rent: ['', Validators.required],
      vacant: ['', Validators.required]
    });
  }

  submit() {
    console.log(this.propertyForm);
  }
}
