import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog-overview',
  templateUrl: './delete-dialog-overview.component.html',
  styleUrls: ['./delete-dialog-overview.component.css']
})
export class DeleteDialogOverviewComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string, type: string, quantity: number},
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void{
    this.dialogRef.close(true);
  }
}
