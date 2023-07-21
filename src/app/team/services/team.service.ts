import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient, private globalService: GlobalService) { }

  private urlBase: string = 'http://localhost:8080/teams';
  public teamsSubject = new Subject<Team[]>();
  public selectTeamEvent = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.globalService.token, }),
  };

  public listAll(): Observable<Team[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    this.http
      .get<Team[]>(this.urlBase, httpOptions)
      .subscribe((teams) => this.teamsSubject.next(teams));
    return this.teamsSubject.asObservable();
  }

  public getTeamsByName(name: string): Observable<Team[]> {
    if (name === '') {
      return this.listAll();
    } else {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.globalService.token,
        }),
      };
      let url = `${this.urlBase}/name/${name}`;
      this.http
        .get<Team[]>(url, httpOptions)
        .subscribe((teams) => this.teamsSubject.next(teams));
      return this.teamsSubject.asObservable();
    }
  }

  public selectTeam(team: Team) {
    this.selectTeamEvent.emit(team);
  }

  public insert(team: Team): Observable<Team> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http
      .post<Team>(this.urlBase, team, httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public update(team: Team): Observable<Team> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http
      .put<Team>(`${this.urlBase}/${team.id}`, team, httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(team: Team): Observable<void> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.globalService.token,
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${team.id}`, httpOptions);
  }
}
