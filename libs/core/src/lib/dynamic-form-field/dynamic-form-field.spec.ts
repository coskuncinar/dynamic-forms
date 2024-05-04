import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementExpressionData } from '../dynamic-form-element/dynamic-form-element-expression-data';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldClassType } from './dynamic-form-field-class-type';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldExpression } from './dynamic-form-field-expression';
import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';
import { DynamicFormFieldExpressions } from './dynamic-form-field-expressions';
import { DynamicFormFieldType } from './dynamic-form-field-type';

class DynamicFormTestField extends DynamicFormField {
  constructor(
    builder: DynamicFormBuilder,
    root: DynamicForm,
    parent: DynamicFormElement,
    definition: DynamicFormFieldDefinition,
    type: DynamicFormFieldType,
  ) {
    const control = {
      disabled: definition?.template?.disabled || false,
      setValidators: () => {},
      setAsyncValidators: () => {},
      updateValueAndValidity: () => {},
    } as unknown as DynamicFormFieldControl<any>;
    super(builder, root, parent, definition, type, control);
  }

  get fieldClassType(): DynamicFormFieldClassType {
    return null;
  }

  check(): void {
    this.checkControl();
    this.checkValidators();
  }
  destroy(): void {}

  reset(): void {}
  resetEmpty(): void {}
  resetDefault(): void {}
  validate(): void {}

  setModel(model: any): void {
    this._model = model;
  }

  setControl(control: any): void {
    this._control = control;
  }

  setValidators(validators: any[]): void {
    this._validators = validators;
  }

  checkExpressions(): void {}

  protected getChildren(): any[] {
    return undefined;
  }

  protected getValidators(): any[] {
    return undefined;
  }

  protected override afterInitExpressions(): void {
    this.checkExpressions();
  }
}

describe('DynamicFormField', () => {
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder, { getFieldId: () => 'fieldId' });
  });

  it('creates instance', () => {
    const root = { classType: 'field', depth: 0 } as DynamicForm;
    const parentField = { classType: 'field', depth: 1 } as DynamicFormField;
    const parent = { parent: parentField as DynamicFormElement } as DynamicFormElement;
    const template = { hidden: true, disabled: true, readonly: true };
    const wrappers = ['wrapper-wrapper', 'wrapper'];
    const definition = { id: 'id', key: 'key', index: 1, type: 'type', template, wrappers } as DynamicFormFieldDefinition;
    const type = { type: 'type' } as DynamicFormFieldType;
    const field = new DynamicFormTestField(builder, root, parent, definition, type);

    expect(field.root).toBe(root);
    expect(field.parent).toBe(parent);
    expect(field.parentField).toBe(parentField);

    expect(field.definition).toBe(definition);
    expect(field.template).toBe(definition.template);
    expect(field.type).toBe(type);

    expect(field.classType).toBe('field');

    expect(field.id).toBe('id');
    expect(field.key).toBe('key');
    expect(field.index).toBe(1);
    expect(field.depth).toBe(2);

    expect(field.model).toBeUndefined();
    expect(field.value).toBeUndefined();
    expect(field.valid).toBeUndefined();
    expect(field.status).toBeUndefined();
    expect(field.control).toBeTruthy();
    expect(field.settings).toBeTruthy();

    expect(field.hidden).toBeTrue();
    expect(field.disabled).toBeTrue();
    expect(field.readonly).toBeTrue();

    expect(field.children).toEqual([]);
    expect(field.headerActions).toEqual([]);
    expect(field.footerActions).toEqual([]);

    expect(field.wrappers).toBe(wrappers);

    expect(field.unregistered).toBeUndefined();
    expect(field.hasValidation).toBeFalse();

    expect(field.expressions).toEqual({});
    expect(field.expressionData).toBeTruthy();
    expect(field.expressionChanges).toBeTruthy();
    expect(field.expressionChangesSubject).toBeTruthy();
  });

  it('creates instance with settings from default settings', () => {
    const definition = { template: {}, settings: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    expect(field.settings).toEqual({ autoGeneratedId: false, updateType: 'change' });
  });

  it('creates instance with settings from definition', () => {
    const definition = { template: {}, settings: { autoGeneratedId: true, updateType: 'blur' } } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    expect(field.settings).toEqual({ autoGeneratedId: true, updateType: 'blur' });
    expect(field.settings).not.toBe(definition.settings);
  });

  it('creates instance with settings from parent settings', () => {
    const parent = { classType: 'field', settings: { autoGeneratedId: true, updateType: 'blur' } } as DynamicFormField;
    const definition = { template: {}, settings: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, parent, definition, {} as DynamicFormFieldType);

    expect(field.settings).toEqual({ autoGeneratedId: true, updateType: 'blur' });
    expect(field.settings).not.toBe(parent.settings);
  });

  it('creates instance with settings from root settings', () => {
    const root = { settings: { autoGeneratedId: true, updateType: 'blur' } } as DynamicForm;
    const parent = { classType: 'field', settings: {} } as DynamicFormField;
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, root, parent, definition, {} as DynamicFormFieldType);

    expect(field.settings).toEqual({ autoGeneratedId: true, updateType: 'blur' });
    expect(field.settings).not.toBe(root.settings);
  });

  it('creates instance with settings from root and parent settings', () => {
    const root = { classType: 'field', settings: { autoGeneratedId: true } } as DynamicForm;
    const parent = { classType: 'field', settings: { updateType: 'blur' } } as DynamicFormField;
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, root, parent, definition, {} as DynamicFormFieldType);

    expect(field.settings).toEqual({ autoGeneratedId: true, updateType: 'blur' });
  });

  it('creates instance with path from key of definition', () => {
    const definition = { key: 'key', template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    expect(field.path).toBe('key');
  });

  it('creates instance with path from parent path and key of definition', () => {
    const parent = { classType: 'field', path: 'path' } as DynamicFormField;
    const definition = { key: 'key', template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, parent, definition, {} as DynamicFormFieldType);

    expect(field.path).toBe('path.key');
  });

  it('hidden returns false', () => {
    const parent = { classType: 'field' } as DynamicFormField;
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, parent, definition, {} as DynamicFormFieldType);

    expect(field.hidden).toBe(false);
  });

  it('hidden returns true if parent is hidden', () => {
    const parent = { classType: 'field', hidden: true } as DynamicFormField;
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, parent, definition, {} as DynamicFormFieldType);

    expect(field.hidden).toBe(true);
  });

  it('hidden returns true if template is hidden', () => {
    const parent = { classType: 'field' } as DynamicFormField;
    const definition = { template: { hidden: true } } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, parent, definition, {} as DynamicFormFieldType);

    expect(field.hidden).toBe(true);
  });

  it('readonly returns false', () => {
    const parent = { classType: 'field' } as DynamicFormField;
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, parent, definition, {} as DynamicFormFieldType);

    expect(field.readonly).toBe(false);
  });

  it('readonly returns true if parent is readonly', () => {
    const parent = { classType: 'field', readonly: true } as DynamicFormField;
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, parent, definition, {} as DynamicFormFieldType);

    expect(field.readonly).toBe(true);
  });

  it('readonly returns true if template is readonly', () => {
    const parent = { classType: 'field' } as DynamicFormField;
    const definition = { template: { readonly: true } } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, parent, definition, {} as DynamicFormFieldType);

    expect(field.readonly).toBe(true);
  });

  it('creates instance with unregistered being true', () => {
    const parent = { path: 'path' } as DynamicFormField;
    const definition = { unregistered: true, template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, parent, definition, {} as DynamicFormFieldType);

    expect(field.unregistered).toBeTrue();
  });

  it('returns expression data with id, key, index, depth, model, value, valid and status', () => {
    const template = { hidden: true, disabled: true, readonly: true };
    const definition = { id: 'id', key: 'key', index: 1, template } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    field.setModel({ value: 'VALUE' });
    field.setControl({ disabled: true, status: 'VALID' });

    expect(field.expressionData.id).toBe('id');
    expect(field.expressionData.key).toBe('key');
    expect(field.expressionData.index).toBe(1);
    expect(field.expressionData.depth).toBe(0);
    expect(field.expressionData.hidden).toBeTrue();
    expect(field.expressionData.disabled).toBeTrue();
    expect(field.expressionData.readonly).toBeTrue();
    expect(field.expressionData.model).toBe(field.model);
    expect(field.expressionData.value).toBe(field.value);
    expect(field.expressionData.valid).toBe(field.valid);
    expect(field.expressionData.status).toBe('VALID');
  });

  it('returns expression data with expression data of root, parent and parent field being defined', () => {
    const rootExpressionData = {} as DynamicFormFieldExpressionData;
    const parentFieldExpressionData = {} as DynamicFormFieldExpressionData;
    const parentExpressionData = {} as DynamicFormElementExpressionData;
    const root = { classType: 'field', depth: 0, expressionData: rootExpressionData } as DynamicForm;
    const parentField = { classType: 'field', depth: 1, expressionData: parentFieldExpressionData } as DynamicFormField;
    const parent = { parent: parentField as DynamicFormElement, expressionData: parentExpressionData } as DynamicFormElement;
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, root, parent, definition, {} as DynamicFormFieldType);

    expect(field.expressionData.depth).toBe(2);
    expect(field.expressionData.root).toBe(rootExpressionData);
    expect(field.expressionData.parent).toBe(parentExpressionData);
    expect(field.expressionData.parentField).toBe(parentFieldExpressionData);
  });

  it('init calls calls initId, initExpressions, initChildren, initValidators, initHeaderActions and initFooterActions', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { template: {}, headerActions: [], footerActions: [] } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, root, parent, definition, {} as DynamicFormFieldType);

    spyOn(builder, 'getFieldId').and.callThrough();
    spyOn(builder, 'createFieldExpressions').and.callThrough();
    spyOn(builder, 'createControlValidators').and.callThrough();
    spyOn(builder, 'createFormActions').and.callThrough();
    spyOn(builder, 'createControlEvaluators').and.callThrough();

    const initIdSpy = spyOn(field as any, 'initId').and.callThrough();
    const getIdSpy = spyOn(field as any, 'getId').and.callThrough();
    const initExpressionsSpy = spyOn(field as any, 'initExpressions').and.callThrough();
    const getExpressionsSpy = spyOn(field as any, 'getExpressions').and.callThrough();
    const initChildrenSpy = spyOn(field as any, 'initChildren').and.callThrough();
    const getChildrenSpy = spyOn(field as any, 'getChildren').and.callThrough();
    const initValidatorsSpy = spyOn(field as any, 'initValidators').and.callThrough();
    const getValidatorsSpy = spyOn(field as any, 'getValidators').and.callThrough();
    const initHeaderActionsSpy = spyOn(field as any, 'initHeaderActions').and.callThrough();
    const getHeaderActionsSpy = spyOn(field as any, 'getHeaderActions').and.callThrough();
    const initFooterActionsSpy = spyOn(field as any, 'initFooterActions').and.callThrough();
    const getFooterActionsSpy = spyOn(field as any, 'getFooterActions').and.callThrough();

    field.init();

    expect(initIdSpy).toHaveBeenCalledTimes(1);
    expect(getIdSpy).toHaveBeenCalledTimes(1);
    expect(builder.getFieldId).toHaveBeenCalledOnceWith(field);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFieldExpressions).toHaveBeenCalledOnceWith(field);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, field, definition.headerActions);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, field, definition.footerActions);
  });

  it('inits id', () => {
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    spyOn(builder, 'getFieldId').and.returnValue('fieldId');

    field.init();

    expect(field.id).toBe('fieldId');
  });

  it('inits expressions', () => {
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);
    const fieldExpressions = {
      required: { value: true } as DynamicFormFieldExpression,
      readonly: { value: false } as DynamicFormFieldExpression,
    } as DynamicFormFieldExpressions;

    spyOn(field, 'checkExpressions');

    spyOn(builder, 'createFieldExpressions').and.returnValue(fieldExpressions);

    field.init();

    expect(field.expressions).toBe(fieldExpressions);
    expect(field.template.required).toBe(true);
    expect(field.template.readonly).toBe(false);
    expect(field.checkExpressions).toHaveBeenCalled();
  });

  it('inits header and footer actions', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { template: {}, headerActions: [{}], footerActions: [{}] } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, root, parent, definition, {} as DynamicFormFieldType);
    const headerActions = [{}] as DynamicFormAction[];
    const footerActions = [{}] as DynamicFormAction[];

    spyOn(builder, 'createFormActions').and.returnValues(headerActions, footerActions);

    field.init();

    expect(field.headerActions).toBe(headerActions);
    expect(field.footerActions).toBe(footerActions);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, field, definition.headerActions);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, field, definition.footerActions);
  });

  it('errors returns errors from control', () => {
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    const errors = {};
    field.setControl({ errors });

    expect(field.errors).toBe(errors);
  });

  it('hasErrors returns true if errors exist', () => {
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    field.setControl({ errors: {} });

    expect(field.hasErrors).toBe(true);
  });

  it('hasErrors returns false if no errors exist', () => {
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    field.setControl({ errors: null });

    expect(field.hasErrors).toBe(false);
  });

  it('showErrors returns false if no errors exist', () => {
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    field.setControl({ errors: null, touched: true });

    expect(field.showErrors).toBe(false);
  });

  it('showErrors returns false if errors exist but control is untouched', () => {
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    field.setControl({ errors: {}, touched: false });

    expect(field.showErrors).toBe(false);
  });

  it('showErrors returns true if errors exist and control is touched', () => {
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    field.setControl({ errors: {}, touched: true });

    expect(field.showErrors).toBe(true);
  });

  it('check set validators that changed and updates value and validity of control', () => {
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);
    const validators = [
      { checkChanges: () => true, validatorFn: () => null },
      { checkChanges: () => true, async: true, validatorFn: () => of(null) },
    ] as any;

    spyOn(field.control, 'setValidators');
    spyOn(field.control, 'setAsyncValidators');
    spyOn(field.control, 'updateValueAndValidity');

    field.setValidators(validators);
    field.check();

    expect(field.control.setValidators).toHaveBeenCalledWith([validators[0].validatorFn]);
    expect(field.control.setAsyncValidators).toHaveBeenCalledWith([validators[1].validatorFn]);
    expect(field.control.updateValueAndValidity).toHaveBeenCalled();
    expect(field.validators).toBe(validators);
    expect(field.hasValidation).toBeTrue();
  });

  it('clear calls resetEmpty and validate', () => {
    const definition = { template: {} } as DynamicFormFieldDefinition;
    const field = new DynamicFormTestField(builder, null, null, definition, {} as DynamicFormFieldType);

    spyOn(field, 'resetEmpty');
    spyOn(field, 'validate');

    field.clear();

    expect(field.resetEmpty).toHaveBeenCalled();
    expect(field.validate).toHaveBeenCalled();
  });
});
