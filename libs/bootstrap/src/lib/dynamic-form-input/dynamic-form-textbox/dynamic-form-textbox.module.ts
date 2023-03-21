import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormAddOnsModule } from '../dynamic-form-add-ons/dynamic-form-add-ons.module';
import { BsDynamicFormTextboxComponent } from './dynamic-form-textbox.component';

export const bsDynamicFormTextboxType: DynamicFormInputType = {
  type: 'textbox',
  component: BsDynamicFormTextboxComponent,
  wrappers: [ 'label', 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormTextboxType),
    BsDynamicFormAddOnsModule,
  ],
  declarations: [
    BsDynamicFormTextboxComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormTextboxComponent,
  ],
})
export class BsDynamicFormTextboxModule {}
