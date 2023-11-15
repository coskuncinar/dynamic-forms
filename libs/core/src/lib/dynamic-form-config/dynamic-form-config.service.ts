import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormActionType } from '../dynamic-form-action/dynamic-form-action-type';
import { DYNAMIC_FORM_ACTION_TYPE_CONFIG, DynamicFormActionTypeConfig } from '../dynamic-form-action/dynamic-form-action-type-config';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-type';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig } from '../dynamic-form-element/dynamic-form-element-type-config';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DYNAMIC_FORM_FIELD_TYPE_CONFIG, DynamicFormFieldTypeConfig } from '../dynamic-form-field/dynamic-form-field-type-config';
import { DynamicFormFieldWrapperType } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import {
  DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG,
  DynamicFormFieldWrapperTypeConfig,
} from '../dynamic-form-field/dynamic-form-field-wrapper-type-config';
import { DynamicFormInputType } from '../dynamic-form-input/dynamic-form-input-type';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG, DynamicFormInputTypeConfig } from '../dynamic-form-input/dynamic-form-input-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormClassType } from './dynamic-form-class-type';

@Injectable()
export class DynamicFormConfigService {
  readonly elementTypes: DynamicFormElementType[];
  readonly fieldTypes: DynamicFormFieldType[];
  readonly actionTypes: DynamicFormActionType[];
  readonly inputTypes: DynamicFormInputType[];
  readonly fieldWrapperTypes: DynamicFormFieldWrapperType[];

  constructor(
    private readonly libraryService: DynamicFormLibraryService,
    @Optional()
    @Inject(DYNAMIC_FORM_ELEMENT_TYPE_CONFIG)
    private elementTypeConfig: DynamicFormElementTypeConfig,
    @Optional()
    @Inject(DYNAMIC_FORM_FIELD_TYPE_CONFIG)
    private fieldTypeConfig: DynamicFormFieldTypeConfig,
    @Optional()
    @Inject(DYNAMIC_FORM_ACTION_TYPE_CONFIG)
    private actionTypeConfig: DynamicFormActionTypeConfig,
    @Optional()
    @Inject(DYNAMIC_FORM_INPUT_TYPE_CONFIG)
    private inputTypeConfig: DynamicFormInputTypeConfig,
    @Optional()
    @Inject(DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG)
    private fieldWrapperTypeConfig: DynamicFormFieldWrapperTypeConfig,
  ) {
    this.elementTypes = this.libraryService.filterTypes(this.elementTypeConfig);
    this.fieldTypes = this.libraryService.filterTypes(this.fieldTypeConfig);
    this.actionTypes = this.libraryService.filterTypes(this.actionTypeConfig);
    this.inputTypes = this.libraryService.filterTypes(this.inputTypeConfig);
    this.fieldWrapperTypes = this.libraryService.filterTypes(this.fieldWrapperTypeConfig);
  }

  getClassType(type: string): DynamicFormClassType | undefined {
    if (this.elementTypes.some(f => f.type === type)) {
      return 'element';
    } else if (this.fieldTypes.some(f => f.type === type)) {
      return 'field';
    } else if (this.actionTypes.some(f => f.type === type)) {
      return 'action';
    } else {
      return undefined;
    }
  }

  getElementType(type: string): DynamicFormElementType | undefined {
    return this.elementTypes.find(f => f.type === type);
  }

  getFieldType(type: string): DynamicFormFieldType | undefined {
    return this.fieldTypes.find(f => f.type === type);
  }

  getActionType(type: string): DynamicFormActionType | undefined {
    return this.actionTypes.find(f => f.type === type);
  }

  getInputType(type: string): DynamicFormInputType | undefined {
    return this.inputTypes.find(f => f.type === type);
  }

  getFieldWrapperType(type: string | undefined): DynamicFormFieldWrapperType | undefined {
    return this.fieldWrapperTypes.find(f => f.type === type);
  }
}
