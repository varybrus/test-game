import { Component, Inject } from '@angular/core';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
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
import { IGameData } from '../../models/igame-data';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'edit-dialog',
    templateUrl: 'edit-dialog.html',
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
        MatDatepickerModule, MatSelectModule
    ],
})
export class EditDialog {
    myForm: FormGroup;
    gameOfficialList = ["Name1", "Name2"];
    constructor(
        public dialogRef: MatDialogRef<EditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: IGameData,
    ) {
        this.myForm = new FormGroup({
            name: new FormControl(data.name, Validators.required),
            date: new FormControl(new Date(data.date)),
            location: new FormControl(data.location),
            imgUrl: new FormControl(data.imgUrl),
            gameOfficials: new FormControl(data.gameOfficials),
            fee: new FormControl(data.fee),
        });
    }
    onSave() {
        const res = this.myForm.value;
        const date: Date = this.myForm.value.date;
        res.date = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
        this.dialogRef.close(res);
    }

}