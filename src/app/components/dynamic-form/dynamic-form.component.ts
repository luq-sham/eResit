import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { isSubmitEnter } from './form-helpers';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: false
})
export class DynamicFormComponent {

  @Input() formConfig: any[] = []
  @Input() validations: any
  @Input() submitted: any
  @Input() form!: FormGroup

  // Enter in a single-line field asks the host to submit.
  @Output() enterSubmit = new EventEmitter<void>()

  isRequired(control: string) {
    return !!this.form.get(control)?.hasValidator(Validators.required)
  }

  onEnter(event: Event) {
    if (isSubmitEnter(event)) this.enterSubmit.emit()
  }
}
