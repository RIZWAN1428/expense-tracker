import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
private baseUrl = 'http://localhost:8080/api/auth';

constructor(private http: HttpClient) {}

  register(data: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, data, { responseType: 'text' });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((res: any) => {
        // Expecting { token: '...' }
        if (res?.token) {
          localStorage.setItem('token', res.token);
          const payload = JSON.parse(atob(res.token.split('.')[1]));
          localStorage.setItem('role', payload?.role);
      window.dispatchEvent(new Event("storage"));
        }
      })
    );
  }

  profile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  saveToken(token: string) { localStorage.setItem('token', token); }
  getToken(): string | null { return localStorage.getItem('token'); }
  logout() { localStorage.removeItem('token'); }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.role ?? null;
    } catch {
      return null;
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp: number | undefined = payload?.exp; // seconds since epoch
      if (!exp) return false; // no exp claim → treat as not expired
      const nowSec = Math.floor(Date.now() / 1000);
      return exp <= nowSec;
    } catch {
      return true; // invalid token → treat as expired
    }
  }

  updateUserRole(id: number, role: string): Observable<string> {
  return this.http.put(
    `${this.baseUrl}/users/${id}/role`,
    { role }, // body
    { responseType: 'text' }
  );
}

deleteUser(userId: number): Observable<any> {
 return this.http.delete(`${this.baseUrl}/users/${userId}`, { responseType: 'text' });
}


getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/users`);
}
updatePermissions(userId: number, body: any) {
  return this.http.put(`http://localhost:8080/api/auth/users/${userId}/permissions`, body);
}

}
