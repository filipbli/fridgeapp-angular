import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroceriesListComponent } from './groceries-list/groceries-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet, provideRouter } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IsTakenDialogOverviewComponent } from './is-taken-dialog-overview/is-taken-dialog-overview.component';
import { DeleteDialogOverviewComponent } from './delete-dialog-overview/delete-dialog-overview.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    GroceriesListComponent,
    ToolbarComponent,
    AddFormComponent,
    IsTakenDialogOverviewComponent,
    DeleteDialogOverviewComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatDialogModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
