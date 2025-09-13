import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-admin-nav-link',
  templateUrl: './admin-nav-link.html',
  imports: [RouterLink, NgIcon],
})
export class AdminNavLink {
  @Input() link!: string;
  @Input() name!: string;

  isActiveLink = (url: string) => {
    return window.location.pathname === url;
  };
}
