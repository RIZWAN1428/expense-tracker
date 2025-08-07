import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-login',
  imports: [FormsModule,MatButtonModule,RouterModule,MatFormFieldModule,
MatInputModule,
MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
user = { username: '', password: '' };

constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.user).subscribe({
      next: res => {
        this.auth.saveToken((res as any).token);
        this.router.navigate(['/dashboard']);
      },
      error: () => alert('Login failed')
    });
  }
}
