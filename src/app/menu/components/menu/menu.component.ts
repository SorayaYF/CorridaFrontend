import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public showMenu: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.showMenuEmitter.subscribe((data) => {
      this.showMenu = data;
    });
  }
}
