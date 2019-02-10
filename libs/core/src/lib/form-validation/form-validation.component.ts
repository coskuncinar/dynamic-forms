import { Component, Inject, Input } from '@angular/core';
import { FormConfig, FORM_CONFIG } from '../form/form-config';
import { FormValidationErrors } from './form-validation-errors';

@Component({
  selector: 'core-form-validation',
  templateUrl: './form-validation.component.html'
})
export class FormValidationComponent {
  @Input() errors: FormValidationErrors;

  constructor(@Inject(FORM_CONFIG) private formConfig: FormConfig) {}

  get message() {
    const key = Object.keys(this.errors)[0];
    const error = this.errors[key];
    return error && error.message ? error.message : this.getMessage(key);
  }

  private getMessage(key: string) {
    const config = this.formConfig.validationConfig;
    return config.messages[key] || config.defaultMessage;
  }
}
