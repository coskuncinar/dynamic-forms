import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormGroupComponent } from '@dynamic-forms/core';
import { DynamicFormComponentFactory } from '@dynamic-forms/core';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { DynamicFormValidationBuilder } from '@dynamic-forms/core';
import { DynamicFormFieldExpressionsBuilder } from '@dynamic-forms/core';
import { DynamicFormBuilder } from '@dynamic-forms/core';
import { DynamicFormArrayComponent } from '@dynamic-forms/core';
import { DynamicFormConfigService } from '@dynamic-forms/core';
import { CheckboxComponent } from './dynamic-form-control/checkbox/checkbox.component';
import { DatepickerComponent } from './dynamic-form-control/datepicker/datepicker.component';
import { DropdownComponent } from './dynamic-form-control/dropdown/dropdown.component';
import { MatDynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { MatDynamicFormControlModule } from './dynamic-form-control/dynamic-form-control.module';
import { NumberboxComponent } from './dynamic-form-control/numberbox/numberbox.component';
import { TextboxComponent } from './dynamic-form-control/textbox/textbox.component';
import { MatDynamicFormValidationModule } from './dynamic-form-validation/dynamic-form-validation.module';

const defaultConfig: DynamicFormConfig = {
  module: 'material',
  fieldConfig: {
    types: [
      { type: 'group', component: DynamicFormGroupComponent },
      { type: 'array', component: DynamicFormArrayComponent },
      { type: 'control', component: MatDynamicFormControlComponent }
    ]
  },
  controlConfig: {
    types: [
      { type: 'checkbox', component: CheckboxComponent },
      { type: 'datepicker', component: DatepickerComponent },
      { type: 'dropdown', component: DropdownComponent },
      { type: 'numberbox', component: NumberboxComponent },
      { type: 'textbox', component: TextboxComponent }
    ]
  },
  validationConfig: {
    defaultMessage: 'The field is invalid.',
    messages: {
      required: 'The field is required.',
      email: 'The field is not an email.',
      pattern: 'The field does not fit the pattern.',
      min: 'The field does not fit the min value',
      max: 'The field does not fit the max value',
      minlength: 'The field does not fit the min length',
      maxlength: 'The field does not fit the max length'
    }
  }
};

export function configureFormConfigService(configs: DynamicFormConfig[]): DynamicFormConfigService {
  const config = configs.find(c => c.module === defaultConfig.module);
  return new DynamicFormConfigService(config);
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    MatFormFieldModule,
    MatDynamicFormControlModule,
    MatDynamicFormValidationModule
  ],
  exports: [
    DynamicFormsCoreModule
  ]
})
export class DynamicFormsMaterialModule {
  static forRoot(config: DynamicFormConfig = defaultConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsMaterialModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config,
          multi: true
        },
        {
          provide: DynamicFormConfigService,
          useFactory: configureFormConfigService,
          deps: [ DYNAMIC_FORM_CONFIG ]
        },
        DynamicFormBuilder,
        DynamicFormFieldExpressionsBuilder,
        DynamicFormValidationBuilder,
        DynamicFormComponentFactory
      ]
    };
  }
}
