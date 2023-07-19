import { Component, OnInit } from '@angular/core';
import { Speedway } from '../../models/speedway';
import { SpeedwayService } from '../../services/speedway.service';
import { CountryService } from 'src/app/country/services/country.service';

@Component({
  selector: 'app-speedway-table',
  templateUrl: './speedway-table.component.html',
  styleUrls: ['./speedway-table.component.scss'],
})
export class SpeedwayTableComponent implements OnInit {
  public speedways!: Speedway[];

  constructor(private service: SpeedwayService, private countryService: CountryService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((speedways) => {
      this.speedways = speedways;
    });
  }

  public editSpeedway(speedway: Speedway) {
    let newSpeedway = {
      id: speedway.id,
      name: speedway.name,
      size: speedway.size,
      country: speedway.country,
    };
    this.service.selectSpeedway(newSpeedway);
  }

  public deleteSpeedway(speedway: Speedway) {
    this.service.delete(speedway).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.speedways = data;
      });
    });
  }
}
