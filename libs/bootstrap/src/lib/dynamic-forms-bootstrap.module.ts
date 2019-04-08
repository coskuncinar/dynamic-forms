import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { dynamicFormsCoreServices } from '@dynamic-forms/core';
import { DynamicFormConfigService } from '@dynamic-forms/core';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { DynamicFormControlBootstrapModule } from './dynamic-form-control/dynamic-form-control.module';
import { DynamicFormInputBootstrapModule } from './dynamic-form-input/dynamic-form-input.module';
import { DynamicFormValidationBootstrapModule } from './dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormWrapperBootstrapModule } from './dynamic-form-wrapper/dynamic-form-wrapper.module';
import { DynamicFormBootstrapModule } from './dynamic-form/dynamic-form.module';
import { bsDynamicFormConfig, bsDynamicFormConfigFactory } from './dynamic-forms-bootstrap.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    DynamicFormBootstrapModule,
    DynamicFormControlBootstrapModule,
    DynamicFormInputBootstrapModule,
    DynamicFormValidationBootstrapModule,
    DynamicFormWrapperBootstrapModule
  ],
  exports: [
    DynamicFormBootstrapModule
  ]
})
export class DynamicFormsBootstrapModule {
  static forRoot(config?: DynamicFormConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsBootstrapModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config || bsDynamicFormConfig,
          multi: true
        },
        {
          provide: DynamicFormConfigService,
          useFactory: bsDynamicFormConfigFactory,
          deps: [ DYNAMIC_FORM_CONFIG ]
        },
        ...dynamicFormsCoreServices
      ]
    };
  }
}
