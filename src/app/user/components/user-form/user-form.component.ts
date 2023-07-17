import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  public filterName!: string;

  constructor(private userService: UserService) {}

  filterUsersByName(): void {
    this.userService.getUsersByName(this.filterName).subscribe(users => {
      this.userService.usersSubject.next(users); // Atualiza o Subject do UserService
    });
  }
}
