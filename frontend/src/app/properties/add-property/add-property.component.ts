import {
  Component,
  OnInit,
  ViewChildren,
  AfterViewInit,
  OnDestroy,
  ElementRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControlName
} from '@angular/forms';
import { PropertyService } from '../../shared/services/property.service';
import { debounceTime } from 'rxjs/operators';
import { merge, fromEvent, Observable } from 'rxjs';
import { Validator } from '../../shared/directive/validator';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  propertyForm: FormGroup;
  private validator: Validator;
  private validationMessages: { [key: string]: { [key: string]: string } };
  // displayMessage: { [key: string]: { [key: string]: string } } = {};
  displayMessage: { [key: string]: string } = {};
  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService
  ) {
    this.validationMessages = {
      name: {
        required: 'Property name is required.',
        minlength: 'Property name must be at least three characters.',
        maxlength: 'Property name cannot exceed 50 characters.'
      },
      address: {
        required: 'Address is required.',
        minlength: 'Address must be at least three characters.'
      }
    };
    this.validator = new Validator(this.validationMessages);
  }

  get units(): FormArray {
    return this.propertyForm.get('units') as FormArray;
  }

  ngOnInit() {
    this.propertyForm = this.fb.group({
      name: [
        '',
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ],
      address: ['', Validators.required, Validators.minLength(3)],
      units: this.fb.array([this.buildUnit()])
    });
  }

  buildUnit(): FormGroup {
    return this.fb.group({
      floor: ['', Validators.required],
      number: ['', Validators.required],
      rent: ['', Validators.required],
      vacant: ['', Validators.required]
    });
  }

  addNewUnit(): void {
    this.units.push(this.buildUnit());
  }

  submit() {
    const details = { ...this.propertyForm.value };
    console.log(details);
    this.propertyService
      .addPropertyListing(this.propertyForm.value)
      .subscribe(result => {
        console.log(result);
      });
  }
  ngAfterViewInit() {
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(this.propertyForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(800))
      .subscribe(value => {
        this.displayMessage = this.validator.processMessages(this.propertyForm);
      });
  }

  ngOnDestroy() {}
}
