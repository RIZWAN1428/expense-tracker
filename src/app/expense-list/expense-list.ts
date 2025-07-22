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

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;


constructor(private http: HttpClient, private router: Router) {}
  editExpense(expense: any) {
  this.router.navigate(['/add'], { queryParams: { id: expense.id } });
}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchExpenses() {
    this.http.get<any[]>('http://localhost:3000/expenses').subscribe(data => {
      this.dataSource.data = data;
    });
  }

  deleteExpense(id: number) {
    this.http.delete(`http://localhost:3000/expenses/${id}`).subscribe(() => {
      this.fetchExpenses();
    });
  }
@Output() editRequested = new EventEmitter<any>();



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.fetchExpenses();
  }
}
