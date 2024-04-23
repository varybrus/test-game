import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  createGrid,
} from "ag-grid-community";

import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component

import { EditDialog } from './dialogs/edit-dialog/edit-dialog';
import { CustomButtonComponent } from './custom-button-component';
import { ConfirmDialog } from './dialogs/change-status-dialog';
import { IGameData } from './models/igame-data';
import { StatusGame } from './models/status-game';
import { HttpGameService } from './services/http.game.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, MatButtonModule, MatDividerModule, MatIconModule,
    MatDialogModule,
    AgGridAngular
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Game';

  private gridApi!: GridApi<IGameData>;
  public paginationPageSize = 3;
  public paginationPageSizeSelector: number[] | boolean = false;
  // Row Data: The data to be displayed.
  public rowData!: IGameData[];
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { headerName: 'Name', field: "name", },
    { headerName: 'Date', field: "date" },
    { headerName: 'Status', field: "status" },
    { headerName: 'Location', field: "location" },
    {
      headerName: "Image",
      field: "imageUrl",
      cellRenderer: function (params: any) {
        return '<img class="imgGame" src="assets/images/' + params.data.imgUrl + '"/>';
      }
    },
    {
      field: "button", cellRenderer: CustomButtonComponent, width: 250, cellRendererParams: {
        onOpenDialog: this.openDialog.bind(this),
        onOpenCancelStatusDialog: this.openCancelStatusDialog.bind(this),
        label: 'Click'
      }
    },
  ];

  constructor(public dialog: MatDialog, public httpGameService: HttpGameService) { }

  onGridReady(params: GridReadyEvent<IGameData>) {
    this.gridApi = params.api;
    this.httpGameService.getData().subscribe(data => {
      this.rowData = data;
      this.gridApi.setGridOption("rowData", this.rowData);
    });

  }

  openDialog(data: IGameData) {

    const dialogRef = this.dialog.open(EditDialog, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result: IGameData) => {
      if (result == null)
        return;
      data.name = result.name;
      data.imgUrl = result.imgUrl;
      data.date = result.date;
      data.location = result.location;
      data.gameOfficials = result.gameOfficials;
      data.fee = result.fee;
      this.gridApi.setGridOption("rowData", this.rowData);
      this.httpGameService.updateGame(data);
    });
  }

  openCancelStatusDialog(data: IGameData) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        data.status = StatusGame.Cancel
        this.gridApi.setGridOption("rowData", this.rowData);
        this.httpGameService.updateGame(data);
      }
    });
  }
}


