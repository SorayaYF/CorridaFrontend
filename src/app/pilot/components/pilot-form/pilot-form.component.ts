import { Component, OnInit } from '@angular/core';
import { Pilot } from '../../models/pilot';
import { Country } from 'src/app/country/models/country';
import { Team } from 'src/app/team/models/team';
import { PilotService } from '../../services/pilot.service';
import { CountryService } from 'src/app/country/services/country.service';
import { TeamService } from 'src/app/team/services/team.service';

@Component({
  selector: 'app-pilot-form',
  templateUrl: './pilot-form.component.html',
  styleUrls: ['./pilot-form.component.scss'],
})
export class PilotFormComponent implements OnInit {
  public pilots!: Pilot[];
  public pilot = {} as Pilot;
  public countrys!: Country[];
  public teams!: Team[];
  public showTeamFilters = false;
  public showCountryFilters = false;
  public selectedTeam: Team | undefined;
  public selectedCountry: Country | undefined;

  constructor(
    private service: PilotService,
    private countryService: CountryService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.service.selectPilotEvent.subscribe((data) => {
      this.pilot = { ...data };
    });
    this.countryService.listAll().subscribe((countrys) => {
      this.countrys = countrys;
    });
    this.teamService.listAll().subscribe((teams) => {
      this.teams = teams;
    });
  }

  public getPilotsByName() {
    this.service.getPilotsByName(this.pilot.name).subscribe((data) => {
      this.pilots = data;
    });
  }

  public showTeamContainer() {
    this.showTeamFilters = true;
    this.showCountryFilters = false;
  }

  public getPilotsByTeam() {
    if (this.selectedTeam !== undefined) {
      this.service.getPilotsByTeam(this.selectedTeam.id).subscribe((data) => {
        this.pilots = data;
      });
      this.showTeamFilters = false;
    }
  }

  public showCountryContainer() {
    this.showCountryFilters = true;
    this.showTeamFilters = false;
  }

  public getPilotsByCountry() {
    if (this.selectedCountry !== undefined) {
      this.service
        .getPilotsByCountry(this.selectedCountry.id)
        .subscribe((data) => {
          this.pilots = data;
        });
      this.showCountryFilters = false;
    }
  }

  public savePilot() {
    if (this.pilot.id) {
      this.service.update(this.pilot).subscribe((data) => {
        this.pilot = {} as Pilot;
      });
    } else {
      this.service.insert(this.pilot).subscribe((data) => {
        this.pilot = {} as Pilot;
      });
    }
  }
}
