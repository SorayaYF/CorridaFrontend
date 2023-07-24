import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Speedway } from '../models/speedway';
import { LoginService } from 'src/app/login/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class SpeedwayService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  private urlBase: string = 'http://localhost:8080/speedways';
  public speedwaysSubject = new Subject<Speedway[]>();
  public selectSpeedwayEvent = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.loginService.token,
    }),
  };

  public listAll(): Observable<Speedway[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    this.http
      .get<Speedway[]>(this.urlBase, httpOptions)
      .subscribe((speedways) => this.speedwaysSubject.next(speedways));
    return this.speedwaysSubject.asObservable();
  }

  public getSpeedwaysByName(name: string): Observable<Speedway[]> {
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
        .get<Speedway[]>(url, httpOptions)
        .subscribe((speedways) => this.speedwaysSubject.next(speedways));
      return this.speedwaysSubject.asObservable();
    }
  }

  public getSpeedwaysBySize(
    sizeIn: number,
    sizeFin: number
  ): Observable<Speedway[]> {
    let url = `${this.urlBase}/size/${sizeIn}/${sizeFin}`;
    this.http
      .get<Speedway[]>(url)
      .subscribe((speedways) => this.speedwaysSubject.next(speedways));
    return this.speedwaysSubject.asObservable();
  }

  public getSpeedwaysByCountry(id: number): Observable<Speedway[]> {
    let url = `${this.urlBase}/country/${id}`;
    this.http
      .get<Speedway[]>(url)
      .subscribe((speedways) => this.speedwaysSubject.next(speedways));
    return this.speedwaysSubject.asObservable();
  }

  public selectSpeedway(speedway: Speedway) {
    this.selectSpeedwayEvent.emit(speedway);
  }

  public insert(speedway: Speedway): Observable<Speedway> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http.post<Speedway>(this.urlBase, speedway, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(speedway: Speedway): Observable<Speedway> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http
      .put<Speedway>(`${this.urlBase}/${speedway.id}`, speedway, httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(speedway: Speedway): Observable<void> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.token,
      }),
    };
    return this.http.delete<void>(
      `${this.urlBase}/${speedway.id}`,
      httpOptions
    );
  }
}
