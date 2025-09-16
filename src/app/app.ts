import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AddExpense } from './add-expense/add-expense';
import { ExpenseList } from './expense-list/expense-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
selector: 'app-root',
standalone: true,
imports: [
MatSidenavModule,
MatListModule,
MatToolbarModule,
MatIconModule,
RouterModule,
FormsModule,
CommonModule
],
templateUrl: './app.html',
styleUrls: ['./app.css']
})
export class App {
title = 'expense-tracker';
pageTitle: string = 'Dashboard';
role: string | null = null;

@ViewChild('listRef') expenseList!: ExpenseList;
@ViewChild('formRef', { static: false }) formRef!: AddExpense;

constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public auth: AuthService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.activatedRoute.firstChild;
        while (route?.firstChild) {
          route = route.firstChild;
        }
        this.pageTitle = route?.snapshot.data['title'] || 'Expense Manager';
      });
  }

  ngOnInit() {
    this.role = this.auth.getUserRole()?.replace('ROLE_', '').toUpperCase() || null;

  console.log("ROLE VALUE =>", this.role);

  window.addEventListener("storage", () => {
  this.role = this.auth.getUserRole()?.replace('ROLE_', '').toUpperCase() || null;
  console.log("UPDATED ROLE =>", this.role);
});
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.expenseList?.fetchExpenses();
    });

  }

  onExpenseAdded() {
    this.expenseList.fetchExpenses();
    console.log("formRef is", this.formRef);
    console.log("expenseList is", this.expenseList);
  }

  onEditExpense(expense: any) {
    if (this.formRef) {
      this.formRef.setFormData(expense);
    }
    console.log("formRef is", this.formRef);
    console.log("expenseList is", this.expenseList);
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
