import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';

@Component({
  selector: 'dynamic-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

describe('DynamicFormInputBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormInputTestComponent
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormValidationService
      ]
    });
  });

  it('creates component', () => {
    const form = new DynamicForm({ key: 'root', children: [] } as DynamicFormDefinition, {});
    const field = new DynamicFormControl(form, form, {
      id: 'id',
      key: 'key',
      index: 1,
      template: {
        input: {
          type: 'input'
        },
        hints: {},
        validation: {}
      }
    } as DynamicFormControlDefinition);

    const fixture = TestBed.createComponent(DynamicFormInputTestComponent);
    const component = fixture.componentInstance;
    component.field = field;

    fixture.detectChanges();

    expect(component.id).toBe('id');
    expect(component.key).toBe('key');
    expect(component.index).toBe(1);
    expect(component.path).toBe('root.key');
    expect(component.template).toBe(field.template);
    expect(component.control).toBe(field.control);
    expect(component.input).toBe(field.input);
    expect(component.inputId).toBe('id');
    expect(component.hints).toBe(field.template.hints);
    expect(component.validation).toBe(field.template.validation);

    component.definition.id = null;

    fixture.detectChanges();

    expect(component.inputId).toBe('root.key');
  });
});
