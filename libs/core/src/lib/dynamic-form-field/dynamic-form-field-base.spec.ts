import { DynamicFormLibrary, DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationConfig } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormFieldBase } from './dynamic-form-field-base';

class DynamicFormFieldTestComponent extends DynamicFormFieldBase {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

describe('DynamicFormFieldBase', () => {
  const libraryName: DynamicFormLibraryName = 'test';
  const library: DynamicFormLibrary = { name: libraryName };
  const validationConfig: DynamicFormValidationConfig = {
    defaultMessage: 'The field is invalid',
    messages: {
      required: 'The field is required',
    },
    libraryName,
  };
  let component: DynamicFormFieldTestComponent;

  beforeEach(() => {
    const libraryService = new DynamicFormLibraryService(library);
    const validationService = new DynamicFormValidationService(libraryService, [ validationConfig ]);

    component = new DynamicFormFieldTestComponent(validationService);
  });

  it('returns properties of field', () => {
    const field = { id: 'id', key: 'key', index: 1, path: 'path', control: {}, errors: {}, hasError: true, showErrors: false } as any;
    component.field = field;

    expect(component.id).toBe('id');
    expect(component.key).toBe('key');
    expect(component.index).toBe(1);
    expect(component.path).toBe('path');
    expect(component.element).toBe(field);
    expect(component.field).toBe(field);
    expect(component.control).toBe(field.control);
    expect(component.errors).toBe(field.errors);
    expect(component.hasErrors).toBe(field.hasErrors);
    expect(component.showErrors).toBe(field.showErrors);
  });

  it('errorMessage returns message from error', () => {
    const errors = { email: { message: 'The field is not a valid email' } };

    component.field = { errors } as any;

    expect(component.errorMessage).toEqual(errors.email.message);
  });

  it('errorMessage returns message from config', () => {
    component.field = { errors: { required: {} } } as any;

    expect(component.errorMessage).toEqual(validationConfig.messages.required as string);
  });

  it('errorMessage returns default message from config for unknown error', () => {
    component.field = { errors: { pattern: {} } } as any;

    expect(component.errorMessage).toEqual(validationConfig.defaultMessage);
  });

  it('errorMessage returns default message from config for unspecified error', () => {
    component.field = { errors: {} } as any;

    expect(component.errorMessage).toEqual(validationConfig.defaultMessage);
  });
});
