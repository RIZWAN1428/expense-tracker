import { provideRouter } from '@angular/router';
import { ExpenseList } from './expense-list/expense-list';
import { AddExpense } from './add-expense/add-expense';
import { Contact } from './contact/contact';

export const routes = [
{ path: 'dashboard', component: ExpenseList, data: { title: 'Dashboard' } },
{ path: 'add', component: AddExpense, data: { title: 'Add Expense' } },
{ path: 'list', component: ExpenseList, data: { title: 'Expense List' } },
{ path: 'contact', component: Contact, data: { title: 'Contact' } },
];

export const appRoutes = provideRouter(routes);
