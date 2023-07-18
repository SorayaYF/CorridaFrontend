import { Component, OnInit } from '@angular/core';
import { Speedway } from '../../models/speedway';
import { SpeedwayService } from '../../services/speedway.service';

@Component({
  selector: 'app-speedway-form',
  templateUrl: './speedway-form.component.html',
  styleUrls: ['./speedway-form.component.scss']
})
export class SpeedwayFormComponent implements OnInit {
  public speedways!: Speedway[];
  public speedway = {} as Speedway;

  constructor(private service: SpeedwayService) {}

  ngOnInit(): void {
    this.service.selectSpeedwayEvent.subscribe((data) => {
      this.speedway = { ...data };
    });
  }

  public getSpeedwaysByName() {
    this.service.getSpeedwaysByName(this.speedway.name).subscribe((data) => {
      this.speedways = data;
    });
  }

  public saveSpeedway() {
    if (this.speedway.id) {
      this.service.update(this.speedway).subscribe((data) => {
        this.speedway = {} as Speedway;
      });
    } else {
      this.service.insert(this.speedway).subscribe((data) => {
        this.speedway = {} as Speedway;
      });
    }
  }

}
