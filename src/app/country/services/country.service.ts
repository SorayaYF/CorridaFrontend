import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Country } from '../models/country';
import { LoginService } from 'src/app/login/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  private urlBase: string = 'http://localhost:8080/countrys';
  public countrysSubject = new Subject<Country[]>();
  public selectCountryEvent = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.loginService.token,
    }),
  };

  public listAll(): Observable<Country[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    this.http
      .get<Country[]>(this.urlBase, httpOptions)
      .subscribe((countrys) => this.countrysSubject.next(countrys));
    return this.countrysSubject.asObservable();
  }

  public getCountrysByName(name: string): Observable<Country[]> {
    if (name === '') {
      return this.listAll();
    } else {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.loginService.token,
        }),
      };
      let url = `${this.urlBase}/name/${name}`;
      this.http
        .get<Country[]>(url, httpOptions)
        .subscribe((countrys) => this.countrysSubject.next(countrys));
      return this.countrysSubject.asObservable();
    }
  }

  public selectCountry(country: Country) {
    this.selectCountryEvent.emit(country);
  }

  public insert(country: Country): Observable<Country> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http.post<Country>(this.urlBase, country, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(country: Country): Observable<Country> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http
      .put<Country>(`${this.urlBase}/${country.id}`, country, httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(country: Country): Observable<void> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${country.id}`, httpOptions);
  }
}
