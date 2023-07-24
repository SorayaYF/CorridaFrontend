import { Component, OnInit } from '@angular/core';
import { Pilot } from '../../models/pilot';
import { PilotService } from '../../services/pilot.service';
import { CountryService } from 'src/app/country/services/country.service';
import { TeamService } from 'src/app/team/services/team.service';

@Component({
  selector: 'app-pilot-table',
  templateUrl: './pilot-table.component.html',
  styleUrls: ['./pilot-table.component.scss'],
})
export class PilotTableComponent implements OnInit {
  public pilots!: Pilot[];

  constructor(
    private service: PilotService,
    private countryService: CountryService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((pilots) => {
      this.pilots = pilots;
    });
  }

  public editPilot(pilot: Pilot) {
    let newPilot = {
      id: pilot.id,
      name: pilot.name,
      country: pilot.country,
      team: pilot.team,
    };
    this.service.selectPilot(newPilot);
  }

  public deletePilot(pilot: Pilot) {
    this.service.delete(pilot).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.pilots = data;
      });
    });
  }
}
