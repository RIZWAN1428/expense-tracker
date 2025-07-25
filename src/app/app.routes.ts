import { provideRouter } from '@angular/router';
//provideRouter: Angular 15+ way to define standalone routing.
import { ExpenseList } from './expense-list/expense-list';
import { AddExpense } from './add-expense/add-expense';
import { Contact } from './contact/contact';

export const routes = [
{ path: '', component: ExpenseList, data: { title: 'Dashboard' } },
{ path: 'dashboard', component: ExpenseList, data: { title: 'Dashboard' } },
{ path: 'add', component: AddExpense, data: { title: 'Add Expense' } },
{ path: 'list', component: ExpenseList, data: { title: 'Expense List' } },
{ path: 'contact', component: Contact, data: { title: 'Contact' } },
];
//Array of route objects. Each defines a path, component, and optional title.
export const appRoutes = provideRouter(routes);
//Registers routes for the Angular app.
