import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Pilot } from '../models/pilot';
import { LoginService } from 'src/app/login/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class PilotService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  private urlBase: string = 'http://localhost:8080/pilots';
  public pilotsSubject = new Subject<Pilot[]>();
  public selectPilotEvent = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.loginService.token,
    }),
  };

  public listAll(): Observable<Pilot[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    this.http
      .get<Pilot[]>(this.urlBase, httpOptions)
      .subscribe((pilots) => this.pilotsSubject.next(pilots));
    return this.pilotsSubject.asObservable();
  }

  public getPilotsByName(name: string): Observable<Pilot[]> {
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
        .get<Pilot[]>(url, httpOptions)
        .subscribe((pilots) => this.pilotsSubject.next(pilots));
      return this.pilotsSubject.asObservable();
    }
  }

  public getPilotsByCountry(id: number): Observable<Pilot[]> {
    let url = `${this.urlBase}/country/${id}`;
    this.http
      .get<Pilot[]>(url)
      .subscribe((pilots) => this.pilotsSubject.next(pilots));
    return this.pilotsSubject.asObservable();
  }

  public getPilotsByTeam(id: number): Observable<Pilot[]> {
    let url = `${this.urlBase}/team/${id}`;
    this.http
      .get<Pilot[]>(url)
      .subscribe((pilots) => this.pilotsSubject.next(pilots));
    return this.pilotsSubject.asObservable();
  }

  public selectPilot(pilot: Pilot) {
    this.selectPilotEvent.emit(pilot);
  }

  public insert(pilot: Pilot): Observable<Pilot> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http.post<Pilot>(this.urlBase, pilot, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(pilot: Pilot): Observable<Pilot> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http
      .put<Pilot>(`${this.urlBase}/${pilot.id}`, pilot, httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(pilot: Pilot): Observable<void> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${pilot.id}`, httpOptions);
  }
}
