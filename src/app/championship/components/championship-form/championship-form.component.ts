import { Component, OnInit } from '@angular/core';
import { Championship } from '../../models/championship';
import { ChampionshipService } from '../../services/championship.service';

@Component({
  selector: 'app-championship-form',
  templateUrl: './championship-form.component.html',
  styleUrls: ['./championship-form.component.scss'],
})
export class ChampionshipFormComponent implements OnInit {
  public championships!: Championship[];
  public championship = {} as Championship;
  public showYearFilters = false;
  public showCountryFilters = false;
  public yearIn: number | undefined;
  public yearFin: number | undefined;

  constructor(
    private service: ChampionshipService,
  ) {}

  ngOnInit(): void {
    this.service.selectChampionshipEvent.subscribe((data) => {
      this.championship = { ...data };
    });
  }

  public getChampionshipsByDescription() {
    this.service.getChampionshipsByDescription(this.championship.description).subscribe((data) => {
      this.championships = data;
    });
  }

  public showYearContainer() {
    this.showYearFilters = true;
    this.showCountryFilters = false;
  }

  public filterByYear() {
    if (this.yearIn !== undefined && this.yearFin !== undefined) {
      this.getChampionshipsByYear(this.yearIn, this.yearFin);
    }
  }

  public getChampionshipsByYear(yearIn: number, yearFin: number) {
    this.service.getChampionshipsByYear(yearIn, yearFin).subscribe((data) => {
      this.championships = data;
    });
    this.showYearFilters = false;
  }

  public saveChampionship() {
    if (this.championship.id) {
      this.service.update(this.championship).subscribe((data) => {
        this.championship = {} as Championship;
      });
    } else {
      this.service.insert(this.championship).subscribe((data) => {
        this.championship = {} as Championship;
      });
    }
  }
}
