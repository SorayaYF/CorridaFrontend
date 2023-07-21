import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  public teams!: Team[];
  public team = {} as Team;

  constructor(private service: TeamService) {}

  ngOnInit(): void {
    this.service.selectTeamEvent.subscribe((data) => {
      this.team = { ...data };
    });
  }

  public getTeamsByName() {
    this.service.getTeamsByName(this.team.name).subscribe((data) => {
      this.teams = data;
    });
  }

  public saveTeam() {
    if (this.team.id) {
      this.service.update(this.team).subscribe((data) => {
        this.team = {} as Team;
      });
    } else {
      this.service.insert(this.team).subscribe((data) => {
        this.team = {} as Team;
      });
    }
  }

}
