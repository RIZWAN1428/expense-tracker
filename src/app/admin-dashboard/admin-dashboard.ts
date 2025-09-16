import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
selector: 'app-admin-dashboard',
templateUrl: './admin-dashboard.html',
styleUrls: ['./admin-dashboard.css'],
imports: [CommonModule, FormsModule, MatTableModule, MatSelectModule, MatButtonModule],
})
export class AdminDashboard implements OnInit {
users: any[] = [];
roles = ["USER", "EDITOR", "ADMIN"];

constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // --- Helpers ---
  normalizeRole(role: string): string {
    return role?.replace('ROLE_', '');
  }

  denormalizeRole(role: string): string {
    return role?.startsWith('ROLE_') ? role : 'ROLE_' + role;
  }

  // --- API calls ---
  loadUsers() {
    this.authService.getAllUsers().subscribe(data => {
      this.users = data.map(u => ({
        ...u, // spread operator
        role: this.normalizeRole(u.role)
      }));
    });
  }

  updateRole(userId: number, newRole: string) {
  if (confirm("Are you sure you want to update this user?")) {
    this.authService.updateUserRole(userId, this.denormalizeRole(newRole))
      .subscribe(res => {
        alert(res);
        const canEdit = newRole === 'ADMIN' || newRole === 'EDITOR';
        const canDelete = newRole === 'ADMIN';
        this.authService.updatePermissions(userId, { canEdit, canDelete }).subscribe(() => {
          this.loadUsers();
        });
      });
  }
}


  deleteUser(userId: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.authService.deleteUser(userId).subscribe(res => {
        alert(res);
        this.loadUsers(); // refresh user list
      });
    }
  }

  togglePermission(user: any, permission: 'canDelete' | 'canEdit', event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.checked;

    const body: any = { canDelete: user.canDelete, canEdit: user.canEdit };
    body[permission] = value;

    this.authService.updatePermissions(user.id, body)
      .subscribe({
        next: () => user[permission] = value,
        error: () => {
          input.checked = !value; // rollback UI
          alert('Permission update failed');
        }
      });
  }

displayRole(role: string): string {
  return role?.replace('ROLE_', '');
}

}
