import { Component, ViewChild, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExpenseService } from '../expense.service';
import {jwtDecode } from 'jwt-decode';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
MatTooltipModule,
MatFormFieldModule,
MatInputModule
],
templateUrl: './expense-list.html',
styleUrls: ['./expense-list.css']
})
export class ExpenseList implements AfterViewInit, OnInit {
displayedColumns: string[] = ['id', 'title', 'category', 'amount', 'date', 'actions'];
dataSource = new MatTableDataSource<any>();
role: string = '';
canDelete: boolean = false;
canEdit: boolean = false;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

constructor(private expenseService: ExpenseService, private router: Router) {}

  ngOnInit() {
  this.loadUserRole();

  this.displayedColumns = ['id', 'title', 'category', 'amount', 'date'];
if (this.canEdit || this.canDelete || this.role === 'admin') {
  this.displayedColumns.push('actions');
}


  this.fetchExpenses();
}
  loadUserRole() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      this.role = decoded.role?.toLowerCase();
      this.canDelete = decoded.canDelete ?? false;
      this.canEdit = decoded.canEdit ?? false;
    } catch (error) {
      console.error('Error decoding token:', error);
      this.role = '';
      this.canDelete = false;
      this.canEdit = false;
    }
  }
}


  fetchExpenses() {
    this.expenseService.getAllExpenses().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editExpense(expense: any) {
  console.log("Edit clicked by role:", this.role, "expense:", expense);
  this.router.navigate(['/add-expense'], { queryParams: { id: expense.id } })
    .then(success => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation failed');
      }
    })
    .catch(err => {
      console.error('Navigation error:', err);
    });
}


 deleteExpense(id: number) {
  console.log('Deleting id:', id);

  // Normalize role by removing prefix 'role_' and converting to lowercase
  const normalizedRole = this.role.toLowerCase().replace('role_', '');
  console.log('Normalized Role:', normalizedRole);

  if (['editor', 'admin', 'user'].includes(normalizedRole)) {
    this.expenseService.deleteExpense(id).subscribe({
      next: () => {
        console.log('Delete successful');
        this.fetchExpenses();
      },
      error: (err) => {
        console.error('Delete failed', err);
      }
    });
  } else {
    console.warn('Delete not allowed for role:', this.role);
  }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
