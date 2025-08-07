
import { provideRouter } from '@angular/router';
//provideRouter: Angular 15+ way to define standalone routing.
import { ExpenseList } from './expense-list/expense-list';
import { AddExpense } from './add-expense/add-expense';
import { Contact } from './contact/contact';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { AuthGuard } from './auth.guard';

export const routes = [
{ path: '', component: Register, data: { title: 'Welcome' } },
{ path: 'dashboard', component: ExpenseList, data: { title: 'Dashboard' } },
{ path: 'add', component: AddExpense, data: { title: 'Add Expense' } },
{ path: 'list', component: ExpenseList, data: { title: 'Expense List' } },
{ path: 'contact', component: Contact, data: { title: 'Contact' } },
{ path: 'register', component: Register, data: { title: 'Register' } },
{ path: 'login', component: Login , data: { title: 'Login' }},
{ path: 'add', component: AddExpense, canActivate: [AuthGuard] },
];
//Array of route objects. Each defines a path, component, and optional title.
export const appRoutes = provideRouter(routes);
//Registers routes for the Angular app.
