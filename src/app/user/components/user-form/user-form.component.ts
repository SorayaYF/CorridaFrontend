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
  public user = {} as User

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.selectUserEvent.subscribe({
      next: (res: User) => {
        this.user = res;
      }
    })
  }

  public getUsersByName() {
    this.userService.getUsersByName(this.user.name).subscribe((data) => {
      this.users = data;
    });
  }
}
