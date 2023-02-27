import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormActionModule, DynamicFormActionType, DynamicFormConfigModule,
  DynamicFormIconModule, DynamicFormThemeModule } from '@dynamic-forms/core';
import { BsDynamicFormDialogModule } from '../../dynamic-form-dialog/dynamic-form-dialog.module';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormIconComponent } from './dynamic-form-icon.component';

export const bsDynamicFormIconType: DynamicFormActionType = {
  type: 'icon',
  component: BsDynamicFormIconComponent,
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormIconModule,
    DynamicFormActionModule,
    DynamicFormThemeModule,
    DynamicFormConfigModule.withAction(bsDynamicFormIconType),
    BsDynamicFormDialogModule,
  ],
  declarations: [
    BsDynamicFormIconComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormIconComponent,
  ],
})
export class BsDynamicFormIconModule {}
