import { Injectable, WritableSignal, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Observable } from 'rxjs';

const DB_GROCERIES = 'mygroceriesdb';

export interface Groceries {
  id: number;
  name: string;
  type: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private groceries: WritableSignal<Groceries[]> = signal<Groceries[]>([]);
  //private groceries: Observable<Groceries[]> = new Observable<Groceries[]>();

  constructor() { }

  async initalizPlugin() {
    this.db = await this.sqlite.createConnection(
      DB_GROCERIES,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    const schema = `CREATE TABLE IF NOT EXISTS groceries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      quantity INTEGER DEFAULT 0
    );`;

    await this.db.execute(schema);
    this.loadGroceries();
    return true;
  }

  getGroceries() {
    return this.groceries;
  }

  async loadGroceries() {
    const groceries = await this.db.query('SELECT * FROM groceries;');
    this.groceries.set(groceries.values || []);
  }

  async addGroceries(name: string, type: string, quantity: number | null) {
    const query = `INSERT INTO groceries (name, type, quantity) VALUES ('${name}', '${type}', '${quantity}')`;
    const result = await this.db.query(query);

    this.loadGroceries();

    return result;
  }

  async deleteGroceriesById(id: string) {
    const query = `DELETE FROM groceries WHERE id=${id}`;
    const result = await this.db.query(query);

    this.loadGroceries();

    return result;
  }

  async getGroceriesById(id: string) {
    const query = `SELECT * FROM groceries WHERE id=${id}`;
    const result = await this.db.query(query);

    this.loadGroceries();

    return result;
  }

  async increaseQuantity(id: string) {
    const query = `UPDATE groceries SET quantity = quantity + 1 WHERE id=${id}`;
    const result = await this.db.query(query);

    this.loadGroceries();

    return result;
  }

  async decreaseQuantity(id: string) {
    const query = `UPDATE groceries SET quantity = quantity - 1 WHERE id=${id}`;
    const result = await this.db.query(query);

    this.loadGroceries();

    return result;
  }
  /*
  async getGroceriesWithFilter(id: string) {
    const query = `SELECT * FROM groceries WHERE id=${id}`;
    const result = await this.db.query(query);

    this.loadGroceries();

    return result;
  }
  */
}
