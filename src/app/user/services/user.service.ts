import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private urlBase: string = 'http://localhost:8080/users';
  public usersSubject = new Subject<User[]>();
  public selectUserEvent = new EventEmitter();

  public listAll(): Observable<User[]> {
    this.http
      .get<User[]>(this.urlBase)
      .subscribe(users => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public getUsersByName(name: string): Observable<User[]> {
    let url = `${this.urlBase}/name/${name}`;
    this.http.get<User[]>(url)
      .subscribe(users => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public selectUser(user: User) {
    this.selectUserEvent.emit(user);
  }
}
