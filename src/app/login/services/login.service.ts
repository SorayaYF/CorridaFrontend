import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private globalService: GlobalService,
    private authService: AuthenticationService
  ) {}

  getToken(email: string, password: string) {
    return this.globalService.getToken(email, password).pipe(
      map((response: any) => {
        this.authService.setAuthenticated(true);
        return response; 
      })
    );
  }
}
