import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  public users!: User[];

  constructor(private service: UserService, private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.getToken('email1','senha1').subscribe(()=>{
      this.service.listAll().subscribe((data) => {
        this.users = data;
      });
    });
  }

  public editUser(user: User) {
    let newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      roles: user.roles,
    };
    this.service.selectUser(newUser);
  }

  public deleteUser(user: User) {
    this.service.delete(user).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.users = data;
      });
    });
  }
}
