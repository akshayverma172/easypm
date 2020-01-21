import { AbstractControl } from '@angular/forms';

export const getButton = (nativeElement: any, buttonText: string): HTMLButtonElement => {
	const buttons = nativeElement.querySelectorAll('button');
	const nextButton: HTMLButtonElement = Array.from(buttons).find(
		(button: HTMLButtonElement) => button.textContent.trim() === buttonText
	) as HTMLButtonElement;
	return nextButton;
};

export const hasRequiredField = (abstractControl: AbstractControl): boolean => {
	if (abstractControl.validator) {
		const validator = abstractControl.validator({} as AbstractControl);
		if (validator && validator.required) {
			return true;
		}
	}
	if (abstractControl['controls']) {
		for (const controlName in abstractControl['controls']) {
			if (abstractControl['controls'][controlName]) {
				if (hasRequiredField(abstractControl['controls'][controlName])) {
					return true;
				}
			}
		}
	}
	return false;
};
