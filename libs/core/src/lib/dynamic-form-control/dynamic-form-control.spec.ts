import { Validators } from '@angular/forms';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';
import { DynamicFormControlValidator } from './dynamic-form-control-validator';

describe('DynamicFormControl', () => {
  it('new instance', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{ key: 'key' };
    const formControl = new DynamicFormControl(root, root, template);

    expect(formControl.path).toBe('key');
    expect(formControl.root).toBe(root);
    expect(formControl.parent).toBe(root);
    expect(formControl.template).toBe(template);
    expect(formControl.model).toBeUndefined();
    expect(formControl.control).toBeDefined();

    expect(root.model).toEqual({ key: undefined });
  });

  it('new instance with default value for model', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{ key: 'key', input: { defaultValue: 'default' } };
    const formControl = new DynamicFormControl(root, root, template);

    expect(formControl.model).toBe('default');

    expect(root.model).toEqual({ key: 'default' });
  });

  it('new instance subscribes valueChanges of control', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{ key: 'key' };
    const formControl = new DynamicFormControl(root, root, template);

    formControl.control.setValue('value');

    expect(formControl.parent.model.key).toBe('value');
    expect(formControl.model).toBe('value');
  });

  it('check updates control', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{ key: 'key' };
    const formControl = new DynamicFormControl(root, root, template);

    expect(formControl.control.disabled).toBe(false);

    formControl.template.disabled = true;
    formControl.check();

    expect(formControl.control.disabled).toBe(true);

    formControl.template.disabled = false;
    formControl.check();

    expect(formControl.control.disabled).toBe(false);
  });

  it('check updates control validators', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{
      key: 'key',
      type: 'control',
      input: { type: 'input' },
      validation: { required: true }
    };
    const formControl = new DynamicFormControl(root, root, template);
    const formControlValidators = <DynamicFormControlValidator[]>[
      {
        key: 'required', enabled: true, value: undefined,
        validator: Validators.required, factory: _ => Validators.required
      }
    ];

    formControl.setValidators(formControlValidators);
    formControl.control.updateValueAndValidity();

    expect(formControl.control.valid).toBe(false);

    template.validation.required = false;
    formControl.check();

    expect(formControl.control.valid).toBe(true);

    formControl.check();

    expect(formControl.control.valid).toBe(true);

    template.validation.required = true;
    formControl.check();

    expect(formControl.control.valid).toBe(false);
  });

  it('destroy unsubscribes valueChanges of control', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{ key: 'key' };
    const formControl = new DynamicFormControl(root, root, template);

    formControl.destroy();

    expect(formControl).toBeDefined();
  });
});