import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private service: LoginService) {}

  public login(): void {
    this.service.login(this.email, this.password);
  }
}

