import {
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl
} from '@angular/forms';

export class Validator {
  constructor(
    private validationMessages: { [key: string]: { [key: string]: string } }
  ) {}

  modifyKeys(messages, i) {
    const msgs = {};
    for (const key in messages) {
      if (key.hasOwnProperty) {
        msgs[key + i] = messages[key];
      }
    }
    return msgs;
  }

  processMessages(container: FormGroup): { [key: string]: string } {
    const messages = {};
    const controls = container.controls;
    for (const key in controls) {
      if (key.hasOwnProperty) {
        const c = controls[key];
        if (c instanceof FormArray) {
          // do bad me
          let i = 0;
          for (const cGroup of c.controls) {
            let childErrors = this.processMessages(cGroup as any);

            childErrors = this.modifyKeys(childErrors, i);
            console.log(childErrors);
            Object.assign(messages, childErrors);
            i++;
          }
        } else if (c instanceof FormGroup) {
          const childMessages = this.processMessages(c);
          Object.assign(messages, childMessages);
        } else {
          {
            const errors = this.validateMessage(messages, c, key);
            Object.assign(messages, errors);
          }
        }
      }
    }

    return messages;
  }

  validateMessage(messages, c: AbstractControl, key: string) {
    if (this.validationMessages[key]) {
      if ((c.dirty || c.touched) && c.errors) {
        Object.keys(c.errors).map(messageKey => {
          messages[key] = this.validationMessages[key][messageKey];
        });
      }
    }
    return messages;
  }
}
