import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.html',
  imports: [RouterOutlet, RouterModule],
})
export class AuthPage {}
