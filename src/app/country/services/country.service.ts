import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  private urlBase: string = 'http://localhost:8080/countrys';
  public countrysSubject = new Subject<Country[]>();
  public selectCountryEvent = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public listAll(): Observable<Country[]> {
    this.http
      .get<Country[]>(this.urlBase)
      .subscribe((countrys) => this.countrysSubject.next(countrys));
    return this.countrysSubject.asObservable();
  }

  public getCountrysByName(name: string): Observable<Country[]> {
    let url = `${this.urlBase}/name/${name}`;
    this.http
      .get<Country[]>(url)
      .subscribe((countrys) => this.countrysSubject.next(countrys));
    return this.countrysSubject.asObservable();
  }

  public selectCountry(country: Country) {
    this.selectCountryEvent.emit(country);
  }

  public insert(country: Country): Observable<Country> {
    return this.http
      .post<Country>(this.urlBase, country, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public update(country: Country): Observable<Country> {
    return this.http
      .put<Country>(`${this.urlBase}/${country.id}`, country, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(country: Country): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${country.id}`);
  }
}
