import { Component, WritableSignal, signal } from '@angular/core';
import { DatabaseService, Groceries } from '../services/database.service';
import { MatDialog } from '@angular/material/dialog';
import { IsTakenDialogOverviewComponent } from '../is-taken-dialog-overview/is-taken-dialog-overview.component';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  groceries = this.database.getGroceries();
  groceriesNames = [];
  newGroceriesName = '';
  newGroceriesType = '';
  newGroceriesQuantity: number | null = null;

  GroceriesTypes: string[] = ['Nabial', 'Owoce i warzywa', 'Mieso', 'Produkty zbozowe'];

  constructor(private database: DatabaseService, public dialog: MatDialog) {}

  async addGroceries() {
    if(!this.isTaken()) {
      await this.database.addGroceries(this.newGroceriesName, this.newGroceriesType, this.newGroceriesQuantity); 
      this.clearInputs();
    } else {
      this.isTakenDialog();
      this.clearInputs();
    }
  }

  clearInputs() {
    this.newGroceriesName = '';
    this.newGroceriesType = '';
    this.newGroceriesQuantity = null;
  }

  isTaken() {
    for(let element of this.groceries()) {
      if(this.newGroceriesName.toLowerCase() === element.name.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  isTakenDialog() {
    const dialogRef = this.dialog.open(IsTakenDialogOverviewComponent, {
      data: {name: this.newGroceriesName},
    });
  }

}
