import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { LoginService } from 'src/app/login/services/login.service';
import { Championship } from '../models/championship';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  private urlBase: string = 'http://localhost:8080/championships';
  public championshipsSubject = new Subject<Championship[]>();
  public selectChampionshipEvent = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.loginService.token,
    }),
  };

  public listAll(): Observable<Championship[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    this.http
      .get<Championship[]>(this.urlBase, httpOptions)
      .subscribe((championships) => this.championshipsSubject.next(championships));
    return this.championshipsSubject.asObservable();
  }

  public getChampionshipsByDescription(description: string): Observable<Championship[]> {
    if (description === '') {
      return this.listAll();
    } else {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.loginService.token,
        }),
      };
      let url = `${this.urlBase}/description/${description}`;
      this.http
        .get<Championship[]>(url, httpOptions)
        .subscribe((championships) => this.championshipsSubject.next(championships));
      return this.championshipsSubject.asObservable();
    }
  }

  public getChampionshipsByYear(
    yearIn: number,
    yearFin: number
  ): Observable<Championship[]> {
    let url = `${this.urlBase}/year/${yearIn}/${yearFin}`;
    this.http
      .get<Championship[]>(url)
      .subscribe((championships) => this.championshipsSubject.next(championships));
    return this.championshipsSubject.asObservable();
  }

  public selectChampionship(championship: Championship) {
    this.selectChampionshipEvent.emit(championship);
  }

  public insert(championship: Championship): Observable<Championship> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http.post<Championship>(this.urlBase, championship, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(championship: Championship): Observable<Championship> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http
      .put<Championship>(`${this.urlBase}/${championship.id}`, championship, httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(championship: Championship): Observable<void> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http.delete<void>(
      `${this.urlBase}/${championship.id}`,
      httpOptions
    );
  }
}
