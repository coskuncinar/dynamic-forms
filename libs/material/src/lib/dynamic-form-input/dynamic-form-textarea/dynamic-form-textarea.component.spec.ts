import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlTemplate, DynamicFormTemplate, DynamicFormTextarea } from '@dynamic-forms/core';
import { DynamicFormTextareaComponent } from './dynamic-form-textarea.component';
import { DynamicFormTextareaModule } from './dynamic-form-textarea.module';

describe('DynamicFormTextareaComponent', () => {
  let fixture: ComponentFixture<DynamicFormTextareaComponent>;
  let component: DynamicFormTextareaComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormTextarea>;
  let formControl: DynamicFormControl<DynamicFormTextarea>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormTextareaModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormTextareaComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormTextarea>>{ key: 'key', label: 'label', input: {} };
    formControl = new DynamicFormControl<DynamicFormTextarea>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const formFieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const formTextareaDebugElement = formFieldDebugElement.query(By.css('textarea.mat-input-element'));
    const formLabelDebugElement = formFieldDebugElement.query(By.css('label.mat-form-field-label'));
    const formFieldElement = <HTMLElement>formFieldDebugElement.nativeElement;
    const formTextareaElement = <HTMLTextAreaElement>formTextareaDebugElement.nativeElement;
    const formLabelElement = <HTMLLabelElement>formLabelDebugElement.nativeElement;

    expect(formFieldElement).toBeDefined();
    expect(formTextareaElement.id).toBe(component.id);
    expect(formTextareaElement.type).toBe('textarea');
    expect(formLabelElement.innerText).toBe('label');
  });

  it('sets dynamic form control to readonly', () => {
    const formFieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const formTextareaDebugElement = formFieldDebugElement.query(By.css('textarea.mat-input-element'));
    const formFieldElement = <HTMLElement>formFieldDebugElement.nativeElement;
    const formTextareaElement = <HTMLTextAreaElement>formTextareaDebugElement.nativeElement;

    expect(formFieldElement.className).not.toContain('readonly');
    expect(formTextareaElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formFieldElement.className).toContain('readonly');
    expect(formTextareaElement.readOnly).toBe(true);
  });
});