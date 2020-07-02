import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondsPerSolution: number = 0;
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [CustomValidators.addition('answer', 'a', 'b')]
  );
  constructor() {}
  //getter for the a property
  // get a() {
  //   return this.mathFrom.value.a
  // }

  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(200),
        scan(
          (acc, value) => {
            return {
              numberSolved: acc.numberSolved + 1,
              startTime: acc.startTime,
            };
          },
          { numberSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ numberSolved, startTime }) => {
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
  }

  randomNumber(): number {
    return Math.floor(Math.random() * 10);
  }
}
