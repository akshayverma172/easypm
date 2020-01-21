import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormFooterButtonsComponent } from 'src/app/shared/components/form-footer-buttons/form-footer-buttons.component';
import { RouterLinkDirectiveStub, RouterStub } from 'src/app/testing';
import { CustomerService } from './../../shared/services/customer.service';
import { CustomerServiceStub } from './../../testing/customer-service-stub';
import { getButton, hasRequiredField } from './../../testing/testing-utilities';
import { HorsesDetailsComponent } from './horses-details.component';

describe('HorseDetailsComponent', () => {
	let component: HorsesDetailsComponent;
	let customerService: CustomerService;
	let horseDetailsFixture: ComponentFixture<HorsesDetailsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ ReactiveFormsModule ],
			declarations: [ HorsesDetailsComponent, FormFooterButtonsComponent, RouterLinkDirectiveStub ],
			providers: [
				FormBuilder,
				{
					provide: CustomerService,
					useClass: CustomerServiceStub
				},
				{ provide: Router, useClass: RouterStub }
			],
			schemas: [ NO_ERRORS_SCHEMA ]
		}).compileComponents();
	});

	beforeEach(() => {
		horseDetailsFixture = TestBed.createComponent(HorsesDetailsComponent);
		customerService = TestBed.get(CustomerService);
		component = horseDetailsFixture.componentInstance;
		horseDetailsFixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('should create an intial form with three fields', () => {
		const controls = component.horseDetailsForm.controls;
		const controlNames = Object.keys(controls);
		expect(controlNames.length).toBe(3);
		expect(controlNames).toEqual([ 'animalInfo', 'isSameOwner', 'numberOfHorses' ]);
	});

	it('should make sure that horse name and owner name are set to required', () => {
		const controls = component.horseDetailsForm.controls;
		const horseName: FormControl = controls.animalInfo['controls']['0'].controls['horseName'];
		const ownerName: FormControl = controls.animalInfo['controls']['0'].controls['ownerName'];

		expect(hasRequiredField(horseName)).toBeTruthy();
		expect(hasRequiredField(ownerName)).toBeTruthy();
	});

	it('should initially have a disabled next button', () => {
		const nextButton = getButton(horseDetailsFixture.nativeElement, 'Next');
		expect(nextButton.disabled).toBe(true);
	});

	it('should load existing horses and enable next button', () => {
		const numberOfHorses = 1;
		const animals = [ { horseName: 'horse1', ownerName: 'owner1' } ];
		customerService.customerFees = {
			animalInfo: animals,
			isSameOwner: true,
			numberOfHorses: numberOfHorses
		};

		component.ngOnInit();
		horseDetailsFixture.detectChanges();

		// check that our form is populated with the fees that came in.
		expect(component.horseDetailsForm.value.numberOfHorses).toBe(numberOfHorses);
		// check that isSameOwner is set to true
		expect(component.horseDetailsForm.value.isSameOwner).toBe(true);

		// get the form group array
		const formGroup: FormGroup[] = component.animalInfo.controls as any;
		expect(formGroup).toBeDefined();
		// there should be only only group, because animals is an array with one item
		expect(formGroup.length).toBe(1);

		// get the first formgroup
		const firstGroup = formGroup[0];
		expect(firstGroup).toBeDefined();
		// make sure the control names are still the same
		const controlsInGroup = firstGroup.controls;
		expect(Object.keys(controlsInGroup)).toEqual([ 'horseName', 'ownerName' ]);

		// make sure that the first horseName is set based off our array
		expect(controlsInGroup['horseName'].value).toBe(animals[0].horseName);

		// make sure that the first ownerName is set based off our array
		expect(controlsInGroup['ownerName'].value).toBe(animals[0].ownerName);

		// check if next button is enabled
		const nextButton = getButton(horseDetailsFixture.nativeElement, 'Next');
		expect(nextButton.disabled).toBe(false);
	});

	it('should use /payment/intro in the backlink', () => {
		const backLink = horseDetailsFixture.componentInstance.formFooter.backLink;
		expect(backLink).toEqual([ '/payment', 'intro' ]);
	});

	it('should show the correct number of horseName/ownerName fields when changing numberOfHourses', () => {
		component.ngOnInit();
		horseDetailsFixture.detectChanges();

		const totalFields = 0;
		component.addRemoveFields(totalFields);
		const formGroup: FormGroup[] = component.animalInfo.controls as any;
		expect(formGroup.length).toBe(totalFields);
	});

	it('should remove all controls when entering 0', () => {
		component.ngOnInit();
		horseDetailsFixture.detectChanges();

		const totalFields = 5;
		component.addRemoveFields(totalFields);
		const formGroup: FormGroup[] = component.animalInfo.controls as any;
		expect(formGroup.length).toBe(totalFields);
	});

	it(
		'should show multiple horseName/ownerName fields when a number in the top row is presed',
		fakeAsync(() => {
			component.ngOnInit();
			horseDetailsFixture.detectChanges();
			const input = getNoOfHorsesInput();

			const keyEvent = new KeyboardEvent('keydown', { key: '2' } as any);
			input.dispatchEvent(keyEvent);
			input.value = '12';
			horseDetailsFixture.detectChanges();
			tick();

			const formGroup1: FormGroup[] = component.animalInfo.controls as any;
			expect(formGroup1.length).toBe(12);
		})
	);

	it(
		'should remove all fields when backspace is pressed and the input contains a single digit value',
		fakeAsync(() => {
			component.ngOnInit();
			horseDetailsFixture.detectChanges();

			const input = getNoOfHorsesInput();
			input.value = '';
			const keyEvent = new KeyboardEvent('keydown', { key: '5' } as any);
			input.dispatchEvent(keyEvent);
			input.value = '5';
			horseDetailsFixture.detectChanges();
			tick();

			// at this point the form should show 5 fields.
			const formGroup1: FormGroup[] = component.animalInfo.controls as any;
			expect(formGroup1.length).toBe(5);

			// now we hit backspace and delete all fields
			const keyEventBackspace = new KeyboardEvent('keydown', { key: 'Backspace' } as any);
			input.dispatchEvent(keyEventBackspace);
			input.value = '';
			horseDetailsFixture.detectChanges();
			tick();

			const formGroup2: FormGroup[] = component.animalInfo.controls as any;
			expect(formGroup2.length).toBe(0);
		})
	);

	it(
		'should remove last digit when backspace is pressed and the input contains a double digit value',
		fakeAsync(() => {
			component.ngOnInit();
			horseDetailsFixture.detectChanges();

			const input = getNoOfHorsesInput();
			input.value = '1';
			const keyEvent = new KeyboardEvent('keydown', { key: '0' } as any);
			input.dispatchEvent(keyEvent);
			input.value = '10';
			horseDetailsFixture.detectChanges();
			tick();

			// at this point the form should show 10 fields.
			const formGroup1: FormGroup[] = component.animalInfo.controls as any;
			expect(formGroup1.length).toBe(10);

			// now we hit backspace and delete all fields except 1
			const keyEventBackspace = new KeyboardEvent('keydown', { key: 'Backspace' } as any);
			input.dispatchEvent(keyEventBackspace);
			input.value = '1';
			horseDetailsFixture.detectChanges();
			tick();

			const formGroup2: FormGroup[] = component.animalInfo.controls as any;
			expect(formGroup2.length).toBe(1);
		})
	);

	it(
		'should stopPropagation and preventDefault when more than 20 horses are entered',
		fakeAsync(() => {
			component.ngOnInit();
			horseDetailsFixture.detectChanges();
			const input = getNoOfHorsesInput();
			input.value = '2';
			horseDetailsFixture.detectChanges();
			tick();

			const keyEvent = new KeyboardEvent('keydown', { key: '2' } as any);
			spyOn(keyEvent, 'stopPropagation');
			spyOn(keyEvent, 'preventDefault');

			input.dispatchEvent(keyEvent);
			horseDetailsFixture.detectChanges();
			tick();

			expect(keyEvent.stopPropagation).toHaveBeenCalled();
			expect(keyEvent.preventDefault).toHaveBeenCalled();
		})
	);

	it('form should be valid when entering horseName and ownerName', () => {
		const formGroup: FormGroup[] = component.animalInfo.controls as any;
		// get the first formgroup
		const firstGroup = formGroup[0];
		expect(firstGroup).toBeDefined();
		// make sure the control names are still the same
		const controlsInGroup = firstGroup.controls;
		expect(Object.keys(controlsInGroup)).toEqual([ 'horseName', 'ownerName' ]);

		controlsInGroup['horseName'].patchValue('horse1');
		controlsInGroup['ownerName'].patchValue('owner1');

		expect(component.horseDetailsForm.valid).toBe(true);
	});

	it('form should be invalid when horseName and ownerName are empty', () => {
		const formGroup: FormGroup[] = component.animalInfo.controls as any;
		// get the first formgroup
		const firstGroup = formGroup[0];
		expect(firstGroup).toBeDefined();
		// make sure the control names are still the same
		const controlsInGroup = firstGroup.controls;
		expect(Object.keys(controlsInGroup)).toEqual([ 'horseName', 'ownerName' ]);

		expect(component.horseDetailsForm.valid).toBe(false);
	});

	it('should set focus on first horse name when hitting enter in numerOfHorses field', () => {
		component.ngOnInit();
		horseDetailsFixture.detectChanges();
		const keyEnterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
		const input = getNoOfHorsesInput();
		input.dispatchEvent(keyEnterEvent);

		expect(document.activeElement).toBe(component.horsename.nativeElement);
	});

	it('should stop processing numberOfHorses when Escape is pressed', () => {
		component.ngOnInit();
		horseDetailsFixture.detectChanges();

		const keyEscapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
		spyOn(keyEscapeEvent, 'stopPropagation');
		spyOn(keyEscapeEvent, 'preventDefault');

		const input = getNoOfHorsesInput();
		input.dispatchEvent(keyEscapeEvent);

		expect(keyEscapeEvent.stopPropagation).toHaveBeenCalled();
		expect(keyEscapeEvent.preventDefault).toHaveBeenCalled();
	});

	it('should set state when form is valid and next button is clicked', () => {
		const numberOfHorses = 1;
		const animals = [ { horseName: 'horse1', ownerName: 'owner1' } ];
		customerService.customerFees = {
			animalInfo: animals,
			isSameOwner: true,
			numberOfHorses: numberOfHorses
		};

		component.ngOnInit();
		horseDetailsFixture.detectChanges();

		const nextButton = getButton(horseDetailsFixture.nativeElement, 'Next');
		expect(nextButton.disabled).toBe(false);
		nextButton.click();

		expect(component.animalInfo.controls.length).toBe(1);
	});

	it(
		'should set state when this.fees is undefined and form is valid and next button is clicked',
		fakeAsync(() => {
			component.ngOnInit();
			horseDetailsFixture.detectChanges();

			const animals = { animalInfo: [ { horseName: 'horse1', ownerName: 'owner1' } ] };
			component.horseDetailsForm.patchValue(animals);
			horseDetailsFixture.detectChanges();
			tick();

			const nextButton = getButton(horseDetailsFixture.nativeElement, 'Next');
			expect(nextButton.disabled).toBe(false);
			nextButton.click();

			expect(component.animalInfo.controls.length).toBe(1);
		})
	);

	it(
		'should make owner same if checkbox is checked',
		fakeAsync(() => {
			component.ngOnInit();
			horseDetailsFixture.detectChanges();

			const input = getNoOfHorsesInput();
			input.value = '0';

			const keyEvent = new KeyboardEvent('keydown', { key: '2' } as any);
			input.dispatchEvent(keyEvent);
			input.value = '2';
			horseDetailsFixture.detectChanges();
			tick();

			const sameOwnerInput = getMakeOwnerSameInput();
			expect(sameOwnerInput).toBeDefined();
			sameOwnerInput.click();
			horseDetailsFixture.detectChanges();
			expect(sameOwnerInput.checked).toBe(true);
			tick();

			component.makeOwnerSame('same owner');
			horseDetailsFixture.detectChanges();
			tick();

			const owners = getOwnerNameInput();
			expect(owners.length).toBeGreaterThan(0);
			owners.forEach((owner) => expect(owner.value).toBe('same owner'));
		})
	);

	it(
		'should not make owner same if checkbox is unchecked',
		fakeAsync(() => {
			component.ngOnInit();
			horseDetailsFixture.detectChanges();

			const input = getNoOfHorsesInput();
			input.value = '0';

			const keyEvent = new KeyboardEvent('keydown', { key: '2' } as any);
			input.dispatchEvent(keyEvent);
			input.value = '2';
			horseDetailsFixture.detectChanges();
			tick();

			const sameOwnerInput = getMakeOwnerSameInput();
			expect(sameOwnerInput).toBeDefined();
			expect(sameOwnerInput.checked).toBe(false);
			horseDetailsFixture.detectChanges();
			tick();

			component.makeOwnerSame('same owner');
			horseDetailsFixture.detectChanges();
			tick();

			const owners = getOwnerNameInput();
			expect(owners.length).toBeGreaterThan(0);
			owners.forEach((owner) => expect(owner.value).not.toBe('same owner'));
		})
	);

	it(
		'should not go to next step when stopPropagation is true',
		fakeAsync(() => {
			component.ngOnInit();
			horseDetailsFixture.detectChanges();

			const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' } as any);
			const input = getNoOfHorsesInput();
			input.dispatchEvent(keyEvent);
			horseDetailsFixture.detectChanges();
			tick();

			spyOn(component, 'setState');
			component.goToNextStep();
			expect(component.setState).not.toHaveBeenCalled();
		})
	);

	it(
		'should not go to next step when form is invalid',
		fakeAsync(() => {
			component.ngOnInit();
			horseDetailsFixture.detectChanges();

			spyOnProperty(component.horseDetailsForm, 'valid').and.returnValue(false);

			spyOn(component, 'setState');
			component.goToNextStep();
			expect(component.setState).not.toHaveBeenCalled();
		})
	);

	function getNoOfHorsesInput(): HTMLInputElement {
		return horseDetailsFixture.nativeElement.querySelector('[name="noOfHorses"]');
	}

	function getMakeOwnerSameInput(): HTMLInputElement {
		return horseDetailsFixture.nativeElement.querySelector('[name="sameOwner"]');
	}

	function getOwnerNameInput(): HTMLInputElement[] {
		return horseDetailsFixture.nativeElement.querySelectorAll('[name="ownerName"]');
	}
});
