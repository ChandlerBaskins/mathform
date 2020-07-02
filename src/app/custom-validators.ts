import { AbstractControl } from '@angular/forms';

export class CustomValidators {
     /**
     * @description
     *Validator that requires for the user input to be the sum of Num1 and Num2.
     * 
     *
     * @usageNotes
     *
     * ### Validate your addition
     *
     * ```typescript
     * CustomValidators.addition('answer', 'a', 'b')
     * ```
     *
     * @returns A validator function that returns an error if the sum is not true otherwise null
   
     *
     * @see `addition()`
     *
     */
  static addition(target: string, sourceOne: string, sourceTwo: string) {
    return (form: AbstractControl) => {
      const sum =  form.value[target];
      const firstNum = form.value[sourceOne];
      const secondNum = form.value[sourceTwo]
      if (firstNum + secondNum === parseInt(sum)) return null;
      return { addition: true };
    };
  }
}
