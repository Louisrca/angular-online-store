import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthHeader } from '../../../../shared/components/auth-header/auth-header';
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.html',
  imports: [RouterOutlet, RouterModule, AuthHeader],
})
export class AuthPage {}
