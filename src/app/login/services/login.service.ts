import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedIn = false;
  private tokenKey = 'auth_token';

  constructor(private globalService: GlobalService) {}

  public login(email: string, password: string): void {
    // Lógica de autenticação aqui
    const userLogin = {
      email: email,
      password: password
    };

    // Chamada para o servidor para validar o email e senha
    // Substitua esse trecho com sua lógica de validação real
    this.globalService.getToken(userLogin.email, userLogin.password).subscribe(
      (token) => {
        // Autenticação bem-sucedida
        this.isLoggedIn = true;

        // Armazenar o token no localStorage
        localStorage.setItem(this.tokenKey, token);
      },
      (error) => {
        // Autenticação falhou
        this.isLoggedIn = false;
      }
    );
  }

  public logout(): void {
    // Lógica de logout aqui
    this.isLoggedIn = false;
    localStorage.removeItem(this.tokenKey);
  }

  public isAuthenticated(): boolean {
    // Verificar se o usuário está autenticado
    return this.isLoggedIn;
  }
}
