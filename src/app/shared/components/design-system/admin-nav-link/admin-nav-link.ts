import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-admin-nav-link',
  templateUrl: './admin-nav-link.html',
  imports: [RouterLink, NgIcon],
})
export class AdminNavLink {
  @Input() link!: string;
  @Input() name!: string;

  router = inject(Router);

  isActiveLink(link: string): boolean {
    const segments = this.router.url.split('/').filter(Boolean); // ['admin','catalog','add-product']
    const linkSegments = link.split('/').filter(Boolean); // ['admin','catalog']

    if (linkSegments.length > segments.length) return false;

    // compare segment par segment
    return linkSegments.every((seg, idx) => seg === segments[idx]);
  }
}
