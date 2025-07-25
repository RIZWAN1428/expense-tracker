import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../expense.service';


@Component({
selector: 'app-expense-list',
standalone: true,
imports: [
CommonModule,
HttpClientModule,
MatTableModule,
MatPaginatorModule,
MatSortModule,
MatButtonModule,
MatCardModule,
MatIconModule,
MatDividerModule,
MatTooltipModule
],
templateUrl: './expense-list.html',
styleUrl: './expense-list.css'
})
export class ExpenseList implements AfterViewInit {
displayedColumns: string[] = ['id', 'title', 'category', 'amount', 'date', 'actions'];
dataSource = new MatTableDataSource<any>();
//Table data wrapper with sorting, pagination, filtering built-in.
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

//Table's paginator & sort connected after view init.

constructor(private expenseService: ExpenseService, private router: Router) {}
////expenseService`: API service
//router`: for navigation
  editExpense(expense: any) {
//Redirects to AddExpense page with expense id to edit.
  this.router.navigate(['/add'], { queryParams: { id: expense.id } });
}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
//Links table with paginator & sort.
  fetchExpenses() {
  this.expenseService.getAllExpenses().subscribe(data => {
    this.dataSource.data = data;
  });
}//this.expenseService.getAllExpenses() → sets data to table

 deleteExpense(id: number) { //Calls API → refreshes list

  this.expenseService.deleteExpense(id).subscribe((res: any) => {
    this.fetchExpenses();
  });
}

@Output() editRequested = new EventEmitter<any>();

//Not used here, but can emit data to parent if needed.

  applyFilter(event: Event) {
//Takes input value → filters table rows (case-insensitive)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.fetchExpenses(); //this.fetchExpenses();
  }
}
