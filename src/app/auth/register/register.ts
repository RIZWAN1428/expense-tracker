import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@Component({
selector: 'app-register',
standalone: true,
imports: [FormsModule, MatButtonModule, RouterModule, MatFormFieldModule,
MatInputModule, MatIconModule],
templateUrl: './register.html',
styleUrls: ['./register.css']
})
export class Register implements OnInit {
user = { username: '', password: '', role: '' };
loading = false;

constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user.role = params['role'] || 'USER';
    });
  }

  onSubmit() {
    if (this.loading) return;
    this.loading = true;

    this.auth.register(this.user).subscribe({
      next: (response: string) => {
        alert(response);
        this.router.navigate(['/login'], { queryParams: { role: this.user.role } });
      },
      error: () => {
        alert('Registration failed');
        this.loading = false;
      }
    });
  }
}
