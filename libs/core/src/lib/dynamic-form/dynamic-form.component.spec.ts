import { SimpleChange } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupComponent } from '../dynamic-form-group/dynamic-form-group.component';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationComponent } from '../dynamic-form-validation/dynamic-form-validation.component';
import { DynamicFormConfigService } from './dynamic-form-config.service';
import { DynamicFormTemplate } from './dynamic-form-template';
import { DynamicFormBuilder } from './dynamic-form.builder';
import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        DynamicFormComponent,
        DynamicFormFieldComponent,
        DynamicFormGroupComponent,
        DynamicFormValidationComponent
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({
            module: 'core'
          })
        },
        DynamicFormBuilder,
        DynamicFormExpressionBuilder,
        DynamicFormValidationBuilder
      ]
    }).compileComponents();
  }));

  it('creates component', () => {
    const fixture = TestBed.createComponent(DynamicFormComponent);
    const component = fixture.componentInstance;
    const formComponent = fixture.debugElement.query(By.css('form')).componentInstance;
    const formGroupComponent = <DynamicFormGroupComponent>fixture.debugElement
      .query(By.css('dynamic-form-group')).componentInstance;

    component.template = <DynamicFormTemplate>{ fields: [] };
    component.model = {};
    component.ngOnChanges({
      template: new SimpleChange(undefined, component.template, true)
    });

    fixture.detectChanges();

    expect(component).toBeDefined();
    expect(formComponent.formGroup).toBe(component.formGroup);
    expect(formGroupComponent.field).toBe(component.formField);
  });
});
