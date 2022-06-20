import { Component } from '@angular/core';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupBase } from './dynamic-form-group-base';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
})
export class DynamicFormGroupComponent<
  Value extends { [key: string]: any } = any, Model extends Value = Value,
  Template extends DynamicFormGroupTemplate = DynamicFormGroupTemplate,
  Definition extends DynamicFormGroupDefinition<Value, Template> = DynamicFormGroupDefinition<Value, Template>,
  Group extends DynamicFormGroup<Value, Model, Template, Definition> = DynamicFormGroup<Value, Model, Template, Definition>
> extends DynamicFormGroupBase<Value, Model, Template, Definition, Group> {

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
