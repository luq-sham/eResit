import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: false
})
export class ErrorMessageComponent implements OnInit {

  @Input() message: any;
  @Input() field: AbstractControl | any;
  @Input() error: any;
  @Input() submitted: boolean = false;


  constructor() { }

  ngOnInit() { }

  shouldShowError() {
    if ((this?.field.touched && this?.field.errors?.[this.error]) || (this.submitted && this?.field.errors?.[this.error])) {
      return true;
    }
    return false;
  }
}
