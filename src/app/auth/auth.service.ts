import { HttpClient } from '@angular/common/http';
//HttpClient:Used to make HTTP calls (GET, POST, etc.) in Angular.
import { Injectable } from '@angular/core';
//@Injectable:Marks a class as injectable (can be used in other parts via dependency injection).
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
//Tells Angular to create one shared instance of this service.
export class AuthService {
//Angular Auth Service to handle login & registration.

private baseUrl = 'http://localhost:8080/api/auth';
//API base path → http://localhost:8080/api/auth

constructor(private http: HttpClient) {}

  register(data: any) {
  //Sends registration data to backend.
  const headers = { 'Content-Type': 'application/json' };
//Tells backend that data is in JSON format.
  return this.http.post(`${this.baseUrl}/register`, JSON.stringify(data), {
    headers,
    responseType: 'text' as 'json'
  });
//Sends a POST request to /register API.
// JSON.stringify(data) :- Converts data object to a JSON string.
// responseType: 'text' as 'json':- Tells Angular: response is text, but treat it like JSON.
}


  login(data: any) {
  return this.http.post(`${this.baseUrl}/login`, data, { responseType: 'text' }).pipe(
    tap((token: string) => {
      localStorage.setItem('token', token);
    })
  );
}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  //Saves JWT token in localStorage.
  }

  getToken(): string | null {
    return localStorage.getItem('token');
//Gets the saved token.
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
    //Checks if token exists → user is logged in.
  }

  logout() {
    localStorage.removeItem('token');
    //Removes token → logs user out.
  }
}
