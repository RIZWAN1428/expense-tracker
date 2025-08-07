import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {
//implements CanActivate: Used to block/allow route access.
constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); //Gets token from localStorage.
    if (token) return true; //If token exists → allow access (true).

    this.router.navigate(['/login']); Else → redirect to /login.
    return false; //block access (false).
  }
}
