import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Login } from '../../models/login';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public login = {} as Login;

  constructor(private service: LoginService, private authService: AuthenticationService) {}

  ngOnInit(): void {}

  loginButton(): void {
    if (this.login.email && this.login.password) {
      this.service.getToken(this.login.email, this.login.password).subscribe(() => {
        this.clearFields();
      });
    }
  }

  clearFields(): void {
    this.login.email = '';
    this.login.password = '';
  }
}
