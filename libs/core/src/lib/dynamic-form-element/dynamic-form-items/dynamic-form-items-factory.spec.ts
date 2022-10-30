import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../../testing';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormItemDefinition } from './dynamic-form-item-definition';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';
import { dynamicFormItemsFactory } from './dynamic-form-items-factory';

describe('dynamicFormItemsFactory', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
  });

  it('returns DynamicFormItems', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormField;
    const itemDefinition = { template: { label: 'label' }, children: [] } as DynamicFormItemDefinition;
    const definition = { template: {}, children: [ itemDefinition ] } as DynamicFormItemsDefinition;
    const type = {} as DynamicFormElementType;
    const expressions = [ {}, {} ];
    const children = [];

    builder.getDefinition.and.returnValue(itemDefinition);
    builder.createElementExpressions.and.returnValues(...expressions);
    builder.createFormElements.and.returnValue(children);

    const items = dynamicFormItemsFactory(builder, root, parent, definition, type);

    expect(items).toBeTruthy();
    expect(items.definition).toBe(definition);
    expect(items.expressions).toBe(expressions[0]);
    expect(items.children.length).toBe(1);
    expect(items.children[0].definition).toEqual({ ...itemDefinition, index: 0 });
    expect(items.children[0].expressions).toBe(expressions[1]);
    expect(items.children[0].children).toBe(children);

    expect(builder.getDefinition).toHaveBeenCalledWith(itemDefinition, root);
    expect(builder.createElementExpressions).toHaveBeenCalledWith(items);
    expect(builder.createElementExpressions).toHaveBeenCalledWith(items.children[0]);
    expect(builder.createFormElements).toHaveBeenCalledWith(root, parent, itemDefinition.children);
  });
});
