import { Component, Input, OnInit } from '@angular/core';
import { FormConfig } from './services/form-config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '../error-message/service/validation-service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: false
})
export class DynamicFormComponent implements OnInit {

  @Input() formConfig: any[] = []
  @Input() validations: any
  @Input() submitted: any
  @Input() form!: FormGroup

  constructor(
  ) { }

  ngOnInit() {
  }

}
