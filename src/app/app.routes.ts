import { Routes } from '@angular/router';
import { RoleSelect } from './role-select/role-select';
import { Login } from './auth/login/login';
import { AddExpense } from './add-expense/add-expense';
import { ExpenseList } from './expense-list/expense-list';
import { Contact } from './contact/contact';
import { Register } from './auth/register/register';
import { AuthGuard } from './auth.guard';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';



export const appRoutes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },

{ path: 'login', component: Login },
{ path: 'register', component: Register },

{ path: 'dashboard', component: ExpenseList , canActivate: [AuthGuard] },
{ path: 'add-expense', component: AddExpense , canActivate: [AuthGuard] },
{ path: 'contact', component: Contact, canActivate: [AuthGuard]  },
{ path: 'expense-list', component: ExpenseList, canActivate: [AuthGuard]  },

{ path: 'admin-dashboard', component: AdminDashboard, canActivate: [AuthGuard] },

{ path: '**', redirectTo: 'login' }
];
