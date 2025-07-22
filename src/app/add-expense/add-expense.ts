import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
selector: 'app-add-expense',
standalone: true,
imports: [
CommonModule,
FormsModule,
HttpClientModule,
MatFormFieldModule,
MatInputModule,
MatDatepickerModule,
MatNativeDateModule,
MatButtonModule,
MatSelectModule
],
templateUrl: './add-expense.html',
styleUrl: './add-expense.css'
})
export class AddExpense implements OnInit {
constructor(private http: HttpClient, private route: ActivatedRoute) {}

  @Output() expenseAdded = new EventEmitter<void>();

  isLoaded = false;
  title = '';
  category = '';
  amount: number | null = null;
  date: Date | null = null;
  editId: number | null = null;

  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    });

    this.route.queryParams.subscribe((params: any) => {
      const id = params['id'];
      if (id) {
        this.http.get(`http://localhost:3000/expenses/${id}`).subscribe((data: any) => {
          this.setFormData(data);
        });
      }
    });
  }

  saveExpense() {
  if (!this.title.trim() || !this.category.trim() || !this.amount || !this.date) {
  alert('Please fill all fields before saving.');
  return;
}
    const newExpense: any = {
      title: this.title,
      category: this.category,
      amount: Number(this.amount),
      date: this.date
    };

    if (this.editId) {
      newExpense.id = this.editId;
      this.http.put(`http://localhost:3000/expenses/${this.editId}`, newExpense).subscribe({
        next: () => {
          alert('Expense updated!');
          this.expenseAdded.emit();
          this.resetForm();
        },
        error: () => {
          alert('Failed to update expense.');
        }
      });
    } else {
      this.http.post('http://localhost:3000/expenses', newExpense).subscribe({
        next: () => {
          alert('Expense added!');
          this.expenseAdded.emit();
          this.resetForm();
        },
        error: () => {
          alert('Failed to add expense.');
        }
      });
    }
  }

  setFormData(expense: any) {
    this.title = expense.title;
    this.category = expense.category;
    this.amount = expense.amount;
    this.date = new Date(expense.date);
    this.editId = expense.id;
  }

  resetForm(){
    this.title = '';
    this.category = '';
    this.amount = null;
    this.date = null;
    this.editId = null;
  }
}
