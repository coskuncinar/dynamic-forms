import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';
import { dynamicFormModalFactory } from './dynamic-form-modal-factory';

describe('dynamicFormModalFactory', () => {
  it('return modal', () => {
    const expressions = {};
    const children = [];
    const actions = [];
    const trigger = {} as DynamicFormAction;
    const builder = jasmine.createSpyObj<DynamicFormBuilder>('builder', [
      'createElementExpressions',
      'createFormElements',
      'createFormActions',
      'createFormAction',
    ]);
    builder.createElementExpressions.and.returnValue(expressions);
    builder.createFormElements.and.returnValue(children);
    builder.createFormActions.and.returnValue(actions);
    builder.createFormAction.and.returnValue(trigger);

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormField;
    const definition = {
      id: 'id',
      type: 'element',
      template: {},
      children: [],
      footerActions: [],
      trigger: {},
    } as DynamicFormModalDefinition;
    const type = {} as DynamicFormElementType;
    const modal = dynamicFormModalFactory(builder, root, parent, definition, type);

    expect(modal.definition).toBe(definition);
    expect(modal.expressions).toBe(expressions);
    expect(modal.trigger).toBe(trigger);
    expect(modal.children).toBe(children);
    expect(modal.footerActions).toBe(actions);

    expect(builder.createElementExpressions).toHaveBeenCalledWith(modal);
    expect(builder.createFormElements).toHaveBeenCalledWith(root, parent, definition.children);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, modal, definition.footerActions);
    expect(builder.createFormAction).toHaveBeenCalledWith(root, modal, definition.trigger);
  });
});
