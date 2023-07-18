import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Speedway } from '../models/speedway';

@Injectable({
  providedIn: 'root',
})
export class SpeedwayService {
  constructor(private http: HttpClient) {}

  private urlBase: string = 'http://localhost:8080/speedways';
  public countrysSubject = new Subject<Speedway[]>();
  public selectSpeedwayEvent = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public listAll(): Observable<Speedway[]> {
    this.http
      .get<Speedway[]>(this.urlBase)
      .subscribe((speedways) => this.countrysSubject.next(speedways));
    return this.countrysSubject.asObservable();
  }

  public getSpeedwaysByName(name: string): Observable<Speedway[]> {
    let url = `${this.urlBase}/name/${name}`;
    this.http
      .get<Speedway[]>(url)
      .subscribe((speedways) => this.countrysSubject.next(speedways));
    return this.countrysSubject.asObservable();
  }

  public selectSpeedway(speedway: Speedway) {
    this.selectSpeedwayEvent.emit(speedway);
  }

  public insert(speedway: Speedway): Observable<Speedway> {
    return this.http
      .post<Speedway>(this.urlBase, speedway, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public update(speedway: Speedway): Observable<Speedway> {
    return this.http
      .put<Speedway>(`${this.urlBase}/${speedway.id}`, speedway, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(speedway: Speedway): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${speedway.id}`);
  }
}
