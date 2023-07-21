import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private isAuthenticated = false;
  
  constructor(private http: HttpClient) { }

  public token: string = 'Bearer ';

  public getToken(email: string, password: string): Observable<string>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    };
    let url = "http://localhost:8080/auth/token";
    let userLogin = {
      email: email,
      password: password
    }
    return this.http.post<string>(url, userLogin, httpOptions).pipe(
      tap((data) =>{
        this.token += data;
      })
    )
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
