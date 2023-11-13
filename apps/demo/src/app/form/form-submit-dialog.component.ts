import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormSubmit } from '@dynamic-forms/core';

@Component({
  selector: 'app-form-submit-dialog',
  templateUrl: 'form-submit-dialog.component.html',
})
export class FormSubmitDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FormSubmitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DynamicFormSubmit) {}
}
