import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public isAuthenticated = false;

  constructor(private globalService: GlobalService) {}

  Authenticated(): boolean {
    return this.isAuthenticated = this.globalService.isAuthenticatedUser();
  }
}
