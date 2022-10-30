import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label = '';
  @Input() inputType = '';
  @Input() controlName = '';
  fieldTextType: boolean = true;
  inputGroupForm!: FormGroup;

  constructor(public formGroupDirective: FormGroupDirective) {
  }


  ngOnInit(): void {
    this.inputGroupForm = this.formGroupDirective.form;
    this.inputGroupForm.addControl(this.controlName, new FormControl(''));
  }

  get control() {
    return this.inputGroupForm.get(this.controlName);
  }

  registerOnChange(fn: any): void {
    this.inputGroupForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.inputGroupForm = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.inputGroupForm.patchValue(value);
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
