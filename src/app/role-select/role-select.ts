import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
selector: 'app-role-select',
standalone: true,
imports: [
FormsModule,
MatFormFieldModule,
MatSelectModule,
MatButtonModule
],
templateUrl: './role-select.html'
})
export class RoleSelect {
selectedRole: string = '';
constructor(private router: Router) {}

  selectRole(role: string) {
    if (!role) {
    alert("Please select a role before continuing!");
    return;
  }
    console.log('Selected Role:', role);
    this.router.navigate(['/login'], { queryParams: { role: role } });
  }
}
