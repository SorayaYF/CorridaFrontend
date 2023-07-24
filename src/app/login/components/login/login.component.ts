import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public login = {} as Login;

  constructor(private service: LoginService) {}

  loginButton(): void {
    if (this.login.email && this.login.password) {
      this.service
        .login(this.login.email, this.login.password)
        .subscribe(() => {
          this.clearFields();
        });
    }
  }

  clearFields(): void {
    this.login.email = '';
    this.login.password = '';
  }
}
