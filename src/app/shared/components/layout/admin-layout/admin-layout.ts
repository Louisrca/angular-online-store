import { Component } from '@angular/core';
import { AdminNav } from '../../admin-nav/admin-nav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.html',
  imports: [AdminNav, RouterOutlet],
})
export class AdminLayout {}
