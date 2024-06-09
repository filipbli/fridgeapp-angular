import { Component, OnInit, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { DatabaseService, Groceries } from '../services/database.service';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogOverviewComponent } from '../delete-dialog-overview/delete-dialog-overview.component';
import { AppComponent } from '../app.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})

export class HomepageComponent implements OnInit{
  //groceries = this.database.getGroceries();
  groceries: WritableSignal<Groceries[]> = signal([]);
  //filteredData: WritableSignal<Groceries[]> = signal([]);
  filteredData: Groceries[] = [];
  displayedColumns: string[] = ['name', 'quantity', 'type', 'delete-event'];
  filteredDisplayedColums: string[] = ['name', 'quantity', 'delete-event'];
  dataSource = new MatTableDataSource<Groceries>([]);
  deleteConfirm: boolean = false;
  width: string = this.app.getWidth();
  BackgroundColorStyle: string = '';
  filterValue: string = '';

  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  //@ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  constructor(private database: DatabaseService, public dialog: MatDialog, public app: AppComponent) {
    this.dataSource = new MatTableDataSource(this.groceries());
  }

  ngAfterViewInit() {
    /*
    //this.dataSource.paginator = this.paginator || null;
    //this.dataSource.sort = this.sort || null;
    this.groceries = this.database.getGroceries();
    toObservable(this.database.getGroceries()).subscribe(values => {
      this.dataSource = new MatTableDataSource(values);
      this.dataSource.data = values;
      //this.dataSource.paginator = this.paginator || null;
      //this.dataSource.sort = this.sort || null;
    });
    */
  }
  
  ngOnInit(): void {
    this.groceries = this.database.getGroceries();
    /*
    toObservable(this.database.getGroceries()).subscribe(values => {
      this.dataSource.data = values;
    });
    */
  }

  deleteGroceries(groceries: Groceries) {
    this.database.deleteGroceriesById(groceries.id.toString());
  }

  increaseQuantity(groceries: Groceries) {
    this.database.increaseQuantity(groceries.id.toString());
  }

  decreaseQuantity(groceries: Groceries) {
    if(groceries.quantity != 0) {
      this.database.decreaseQuantity(groceries.id.toString());
    }
  }

  openDeleteConfirmationDialog(groceries: Groceries) {
    const dialogRef = this.dialog.open(DeleteDialogOverviewComponent, {
      data: {name: groceries.name, type: groceries.type, quantity: groceries.quantity},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteGroceries(groceries);
      }
    })
  }

  setListItemColor(item: Groceries) {
    if(item.quantity <= 1) {
      return '#ffb3b3';
    } 

    return '';
  } 

  applyFilter() {
    console.info("Filter nazwa:", this.filterValue);
    this.filteredData = this.groceries().filter(x => x.name === this.filterValue);
    for(let element of this.filteredData) {
      console.info(element.name);
    }
  }

  applyFilter2() {
    console.info("Filter nazwa:", this.filterValue);
    this.filteredData = this.groceries().filter(x => x.name.includes(this.filterValue));
    for(let element of this.filteredData) {
      console.info(element.name);
    }
  }
}
