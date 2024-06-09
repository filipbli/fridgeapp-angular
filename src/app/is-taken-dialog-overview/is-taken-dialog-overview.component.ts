import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-is-taken-dialog-overview',
  templateUrl: './is-taken-dialog-overview.component.html',
  styleUrls: ['./is-taken-dialog-overview.component.css']
})
export class IsTakenDialogOverviewComponent {
  constructor(
    public dialogRef: MatDialogRef<IsTakenDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
