import { DynamicFormInputType, DynamicFormsFeature, mergeDynamicFormsFeatures, withDynamicFormInputs } from '@dynamic-forms/core';
import { DynamicFormInputMaskControl, withDynamicFormInputMaskConverterService } from '@dynamic-forms/core/input-mask';
import { matDynamicFormLibrary } from '@dynamic-forms/material';
import { MatDynamicFormInputMaskComponent } from './dynamic-form-input-mask.component';

export const matDynamicFormInputMaskType: DynamicFormInputType = {
  type: 'input-mask',
  component: MatDynamicFormInputMaskComponent,
  control: DynamicFormInputMaskControl,
  libraryName: matDynamicFormLibrary.name,
};

export function withMatDynamicFormInputMask(): DynamicFormsFeature {
  return mergeDynamicFormsFeatures(withDynamicFormInputs(matDynamicFormInputMaskType), withDynamicFormInputMaskConverterService());
}
