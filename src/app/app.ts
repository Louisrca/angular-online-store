import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  host: {
    '[attr.data-fix-primeng]': 'true',
  },
})
export class App {
  constructor() {
    window.addEventListener('offline', () => {
      window.location.href = '/offline.html';
    });
  }
}
