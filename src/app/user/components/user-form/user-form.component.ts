import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public users!: User[];
  public user = {} as User;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((data) => {
      this.user = { ...data };
    });
  }

  public getUsersByName() {
    this.service.getUsersByName(this.user.name).subscribe((data) => {
      this.users = data;
    });
  }

  public saveUser() {
    if (this.user.id) {
      this.service.update(this.user).subscribe((data) => {
        this.user = {} as User;
      });
    } else {
      this.service.insert(this.user).subscribe((data) => {
        this.user = {} as User;
      });
    }
  }
}
