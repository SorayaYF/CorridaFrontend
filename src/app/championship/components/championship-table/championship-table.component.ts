import { Component, OnInit } from '@angular/core';
import { Championship } from '../../models/championship';
import { ChampionshipService } from '../../services/championship.service';

@Component({
  selector: 'app-championship-table',
  templateUrl: './championship-table.component.html',
  styleUrls: ['./championship-table.component.scss']
})
export class ChampionshipTableComponent implements OnInit {
  public championships!: Championship[];

  constructor(
    private service: ChampionshipService,
  ) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((championships) => {
      this.championships = championships;
    });
  }

  public editChampionship(championship: Championship) {
    let newChampionship = {
      id: championship.id,
      description: championship.description,
      year: championship.year,
    };
    this.service.selectChampionship(newChampionship);
  }

  public deleteChampionship(championship: Championship) {
    this.service.delete(championship).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.championships = data;
      });
    });
  }

}
