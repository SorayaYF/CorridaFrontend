import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {
  public teams!: Team[];

  constructor(private service: TeamService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((teams) => {
      this.teams = teams;
    });
  }

  public editTeam(team: Team) {
    let newTeam = {
      id: team.id,
      name: team.name,
    };
    this.service.selectTeam(newTeam);
  }

  public deleteTeam(team: Team) {
    this.service.delete(team).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.teams = data;
      });
    });
  }
}
