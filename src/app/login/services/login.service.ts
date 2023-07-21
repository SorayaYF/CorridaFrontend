import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private globalService: GlobalService,
  ) {}

  getToken(email: string, password: string) {
    return this.globalService.getToken(email, password).pipe(
      map((response: any) => {
        this.globalService.setAuthenticated(true);
        return response; 
      })
    );
  }
}
