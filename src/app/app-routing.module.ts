import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AddFormComponent } from './add-form/add-form.component';
import { GroceriesListComponent } from './groceries-list/groceries-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path: 'homepage', component: HomepageComponent},
  {path: 'addform', component: AddFormComponent},
  {path: 'shoppinglist', component: ShoppingListComponent},
  {path: '', redirectTo: '/homepage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
