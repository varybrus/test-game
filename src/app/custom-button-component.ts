import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
    standalone: true,
    imports: [MatButtonModule, MatDividerModule, MatIconModule],
    template: `
     <button mat-button color="primary" (click)="onOpenDialog()">Edit</button>
     <button mat-button color="warn" (click)="onOpenCancelStatusDialog()">Cancel game</button>`
    ,
})
export class CustomButtonComponent implements ICellRendererAngularComp {
    params: ICellRendererParams | undefined;

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    refresh(params: ICellRendererParams) {
        return true;
    }

    onOpenDialog() {
        (this.params as any).onOpenDialog(this.params?.data);
    }

    onOpenCancelStatusDialog() {
        (this.params as any).onOpenCancelStatusDialog(this.params?.data);
    }
}
