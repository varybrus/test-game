import { Component, Inject } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'confirm-dialog',
  template: `
    <h1 mat-dialog-title>Cancel game</h1>
    <div mat-dialog-content>
      Are you sure to cancel the game?
    </div>
    <div mat-dialog-actions>
         <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Cancel game</button>
         <button mat-button [mat-dialog-close]="false" cdkFocusInitial>Cancel</button>
    </div>
  `,
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
  ],
})
export class ConfirmDialog {
  constructor() { }
}