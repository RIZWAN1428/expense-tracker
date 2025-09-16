import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
selector: 'app-login',
standalone: true,
imports: [FormsModule, MatButtonModule, RouterModule, MatFormFieldModule,
MatInputModule, MatIconModule],
templateUrl: './login.html',
styleUrls: ['./login.css']
})
export class Login{
user = { username: '', password: '' };
loading = false;

constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loading) return;
    this.loading = true;

    this.auth.login(this.user).subscribe({
      next: () => {
        // token + role already saved in AuthService
        const role = this.auth.getUserRole();
        if (role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'EDITOR') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/dashboard']); // normal user
        }
      },
      error: () => {
        alert('Login failed. Check username/password.');
        this.loading = false;
      }
    });
  }
}
