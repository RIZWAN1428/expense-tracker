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
  selector: 'app-register',
  imports: [FormsModule,MatButtonModule,RouterModule,MatFormFieldModule,
MatInputModule,
MatIconModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
user = { username: '', password: '' };

constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Sending:', this.user);
    this.auth.register(this.user).subscribe({
    next: (response: any) => {
    console.log('Success:', response);
    alert(response);
    this.router.navigate(['/login']);
  },
  error: err => {
    console.error('Error:', err);
    alert('Registration failed');
  }
});

  }
}

