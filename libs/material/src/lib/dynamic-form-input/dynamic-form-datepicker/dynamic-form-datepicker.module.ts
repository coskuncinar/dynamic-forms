import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormConfigModule, DynamicFormElementModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

export const matDynamicFormDatepickerType: DynamicFormInputType = {
  type: 'datepicker',
  component: MatDynamicFormDatepickerComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DynamicFormElementModule,
    DynamicFormConfigModule.withInput(matDynamicFormDatepickerType),
  ],
  declarations: [
    MatDynamicFormDatepickerComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormDatepickerComponent,
  ],
})
export class MatDynamicFormDatepickerModule {}
