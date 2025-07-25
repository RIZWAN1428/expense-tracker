import { HttpClient } from '@angular/common/http';
//HttpClient`: For API calls
import { Injectable } from '@angular/core';
//Injectable`: To make the service injectable
import { Observable } from 'rxjs';
//Observable`: For async HTTP responses

@Injectable({
providedIn: 'root'
}) // Makes service globally available without adding in any providers array.
export class ExpenseService {
private apiUrl = 'http://localhost:8080/expenses';
//Base URL for backend API.
constructor(private http: HttpClient) {}
// Injects HTTP client for making requests.
  getAllExpenses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
// GET all expenses → returns observable of list.
  getExpenseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
//GET specific expense by id
  addExpense(expense: any): Observable<any> {
    return this.http.post(this.apiUrl, expense);
  }
// POST new expense to backend.
  updateExpense(id: number, expense: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, expense);
  }
//PUT updated expense data by id
  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
// DELETE expense by id
