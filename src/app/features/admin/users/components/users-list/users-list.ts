import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '@Features/auth/models/auth.model';
import { AuthServices } from '@Features/auth/services/auth';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { hugeUserMinus01 } from '@ng-icons/huge-icons';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { RoleTagDirective } from '@Shared/directives/role-badge/role-badge';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { CapitalizePipe } from '@Shared/pipes/capitalize/capitalize.pipe';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.html',
  standalone: true,
  imports: [...TRANSLATE_IMPORTS, TableModule, CapitalizePipe, RoleTagDirective, NgIcon],
  viewProviders: [provideIcons({ hugeUserMinus01 })],
})
export class UsersList extends BaseComponent implements OnInit {
  private authService = inject(AuthServices);
  hugeUserMinus01 = 'hugeUserMinus01';
  users = signal<User[]>([]);

  ngOnInit() {
    this.users.set(this.authService.getUsers());
  }

  deleteUser(userId: string) {
    this.authService.removeUser(userId);
    this.users.set(this.authService.getUsers());
  }
}
