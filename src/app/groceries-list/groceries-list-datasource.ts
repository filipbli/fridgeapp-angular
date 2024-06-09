import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, of } from 'rxjs';
import { DatabaseService, Groceries } from '../services/database.service';
import { WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';


/**
 * Data source for the GroceriesList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class GroceriesListDataSource extends DataSource<Groceries> {
  //data: WritableSignal<Groceries[]> = this.database.getGroceries();
  //data: Observable<Groceries[]> = of([]);
  data: Groceries[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private database: DatabaseService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */

  connect(): Observable<Groceries[]> {
    this.loadData();
    return toObservable(this.database.getGroceries());
    //return this.database.getGroceries();
  }

  private loadData(): void {
    this.database.loadGroceries().then(() => {
      toObservable(this.database.getGroceries()).subscribe(value => this.data = value);
      //this.data = this.database.getGroceries();
      this.updateDataSource();
    });
  }

  private updateDataSource(): void {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.data = this.data.slice(startIndex, endIndex);
      //this.data = this.data.pipe()
    }
    if (this.sort && this.sort.active && this.sort.direction !== '') {
      this.data = this.data.sort((a, b) => {
        const isAsc = this.sort?.direction === 'asc';
        switch (this.sort?.active) {
          case 'name': return compare(a.name, b.name, isAsc);
          case 'id': return compare(+a.id, +b.id, isAsc);
          default: return 0;
        }
      });
    }
  }
  /*
  connect(): Observable<Groceries[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data() ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }
  */
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Groceries[]): Groceries[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Groceries[]): Groceries[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
