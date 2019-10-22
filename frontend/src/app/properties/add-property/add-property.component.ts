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
import { fromEvent, Observable, merge, Subscription } from 'rxjs';
// import { merge } from 'rxjs/operators/merge';
import { Validator } from '../../shared/directive/validator';
import { ToastrService, Toast } from 'ngx-toastr';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  propertyForm: FormGroup;
  displayMessage: { [key: string]: string } = {};
  private subscription: Subscription;
  private validator: Validator;
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private toastService: ToastrService
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
      },
      floor: {
        required: 'Floor is Required'
      },
      number: {
        required: 'Number is Required'
      },
      rent: {
        required: 'Rent is Required',
        minlength: 'Rent must be 4 characters'
      },
      vacant: {
        required: 'Vacant is Required',
        minlength: 'Vacant is Required'
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
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      address: ['', [Validators.required, Validators.minLength(3)]],
      units: this.fb.array([this.buildUnit()])
    });
  }

  buildUnit(): FormGroup {
    return this.fb.group({
      floor: ['', [Validators.required]],
      number: ['', [Validators.required]],
      rent: ['', [Validators.required, Validators.minLength(3)]],
      vacant: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  addNewUnit(): void {
    this.subscription.unsubscribe();
    this.units.push(this.buildUnit());
    setTimeout(() => this.subscribeEvents());
  }

  submit() {
    this.propertyService
      .addPropertyListing(this.propertyForm.value)
      .subscribe(response => {
        if (response.result === 'success') {
          this.toastService.success('Property Added', 'Status');
          this.propertyForm.reset();
        }
      });
  }
  ngAfterViewInit() {
    // Elements blur to only subscribe for one time
    this.subscribeEvents();
  }

  subscribeEvents() {
    const elementBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    this.subscription = merge(this.propertyForm.valueChanges, ...elementBlurs)
      .pipe(debounceTime(1000))
      .subscribe(val => {
        this.displayMessage = this.validator.processMessages(this.propertyForm);
      });
  }

  removeUnit() {
    this.subscription.unsubscribe();
    const length = this.units.length;
    if (length > 1) {
      this.units.removeAt(this.units.length - 1);
    }

    setTimeout(() => this.subscribeEvents());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
