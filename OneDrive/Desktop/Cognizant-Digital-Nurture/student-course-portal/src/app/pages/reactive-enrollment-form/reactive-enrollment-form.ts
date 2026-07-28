import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';
import { CanComponentDeactivate } from '../../guards/unsavedchanges-guard';

export function noCourseCode(
  control: AbstractControl
): ValidationErrors | null {

  const value = control.value;

  if (value && value.startsWith('XX')) {
    return { noCourseCode: true };
  }

  return null;
}

export const simulateEmailCheck: AsyncValidatorFn = (
  control: AbstractControl
): Promise<ValidationErrors | null> => {

  return new Promise(resolve => {

    setTimeout(() => {

      const value = control.value;

      if (value && value.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }

    }, 800);

  });

};

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm implements OnInit {

  enrollForm!: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      studentEmail: this.fb.control(
        '',
        [
          Validators.required,
          Validators.email
        ],
        [
          simulateEmailCheck
        ]
      ),

      courseId: [
        '',
        [
          Validators.required,
          noCourseCode
        ]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      additionalCourses: this.fb.array([])

    });

  }

  get additionalCourses(): FormArray {

    return this.enrollForm.get('additionalCourses') as FormArray;

  }

  addCourse(): void {

    this.additionalCourses.push(
      new FormControl('', Validators.required)
    );

  }

  removeCourse(index: number): void {

    this.additionalCourses.removeAt(index);

  }

  onSubmit(): void {

    if (this.enrollForm.invalid) {

      this.enrollForm.markAllAsTouched();
      return;

    }

    console.log('Form Value');
    console.log(this.enrollForm.value);

    console.log('Raw Value');
    console.log(this.enrollForm.getRawValue());

    this.submitted = true;

  }

  resetForm(): void {

    this.enrollForm.reset({

      preferredSemester: 'Odd',
      agreeToTerms: false

    });

    this.additionalCourses.clear();

    this.submitted = false;

  }
canDeactivate(): boolean {

  if (this.enrollForm.dirty) {
    return window.confirm('You have unsaved changes. Leave?');
  }

  return true;

}
}