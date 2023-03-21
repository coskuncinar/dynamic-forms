import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormConfigModule, DynamicFormElementModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

export const matDynamicFormNumberboxType: DynamicFormInputType = {
  type: 'numberbox',
  component: MatDynamicFormNumberboxComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormElementModule,
    DynamicFormConfigModule.withInput(matDynamicFormNumberboxType),
  ],
  declarations: [
    MatDynamicFormNumberboxComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormNumberboxComponent,
  ],
})
export class MatDynamicFormNumberboxModule {}
