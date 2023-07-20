import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public isAuthenticated = false;

  constructor(private authService: AuthenticationService) {}

  Authenticated(): boolean {
    return this.isAuthenticated = this.authService.isAuthenticatedUser();
  }
}
