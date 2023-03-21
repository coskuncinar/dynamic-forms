import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormConfigModule, DynamicFormElementModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormSelectComponent } from './dynamic-form-select.component';

export const matDynamicFormSelectType: DynamicFormInputType = {
  type: 'select',
  component: MatDynamicFormSelectComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    DynamicFormElementModule,
    DynamicFormConfigModule.withInput(matDynamicFormSelectType),
  ],
  declarations: [
    MatDynamicFormSelectComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormSelectComponent,
  ],
})
export class MatDynamicFormSelectModule {}
