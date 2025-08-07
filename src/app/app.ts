import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
//Component: Angular component banane ke liye.
//ViewChild: Template ke element ko class ke andar access karne ke liye.
import { AddExpense } from './add-expense/add-expense';
import { ExpenseList } from './expense-list/expense-list';
//AddExpense, ExpenseList: Do custom components — form aur list ke liye.
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
//Angular Material ke modules — sidenav, list, toolbar, icons ke liye.
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';

//RouterModule: Routing enable karta hai.
//Router: Navigation events ko track karta hai.
//NavigationEnd: Navigation complete hone ke baad ka event.
//ActivatedRoute: Current route ka data access karne ke liye.
import { filter } from 'rxjs/operators';
//filter(): RxJS operator — sirf specific events (like NavigationEnd) ko allow karta hai.
@Component({
selector: 'app-root',
//selector: HTML tag jisse ye component use hoga.
standalone: true,
//standalone: true: Ye component Angular 15+ me standalone banaya gaya hai.
imports: [
MatSidenavModule,
MatListModule,
MatToolbarModule,
MatIconModule,
RouterModule,
FormsModule,
CommonModule
],
//imports: Jo modules ye component use karega.
templateUrl: './app.html',
styleUrl: './app.css'
})
export class App {
//App: Root component class.
title = 'expense-tracker';
pageTitle: string = 'Dashboard';
//pageTitle: Dynamic page title (route ke hisaab se).

@ViewChild('listRef') expenseList!: ExpenseList;
//expenseList: Expense list component ko access karega.
@ViewChild('formRef', { static: false }) formRef!: AddExpense;
//formRef: Expense form component ko access karega.
//!:: Non-null assertion (hamesha value rahegi).
//static: false: After view init ke baad available hoga.

constructor(private router: Router, private activatedRoute: ActivatedRoute,  public auth: AuthService) {
//Router, ActivatedRoute: Injected services — routing data ko manage karne ke liye.
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
//Route change hone par deep child route tak jaake data.title se pageTitle update karta hai
  ngAfterViewInit() {
    setTimeout(() => {
      this.expenseList?.fetchExpenses();
    });
  }
//View ke load hone ke baad list component ka method fetchExpenses() call karta hai.
//setTimeout: Avoid Expression Changed After It Has Been Checked Error.
  onExpenseAdded() {
    this.expenseList.fetchExpenses();
    console.log("formRef is", this.formRef);
    console.log("expenseList is", this.expenseList);
  }
//Naya expense add hone ke baad list ko refresh karta hai.
  onEditExpense(expense: any) {
    if (this.formRef) {
      this.formRef.setFormData(expense);
    }
//Edit button click par form me existing expense data set karta hai.
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
