import { Component, OnInit } from '@angular/core';
import { Speedway } from '../../models/speedway';
import { SpeedwayService } from '../../services/speedway.service';
import { CountryService } from 'src/app/country/services/country.service';
import { Country } from 'src/app/country/models/country';

@Component({
  selector: 'app-speedway-form',
  templateUrl: './speedway-form.component.html',
  styleUrls: ['./speedway-form.component.scss']
})
export class SpeedwayFormComponent implements OnInit {
  public speedways!: Speedway[];
  public speedway = {} as Speedway;
  public countrys!: Country[];
  public showSizeFilters = false;
  public showCountryFilters = false;
  public sizeIn: number | undefined;
  public sizeFin: number | undefined;
  public selectedCountry: Country | undefined;

  constructor(private service: SpeedwayService, private countryService: CountryService) {}

  ngOnInit(): void {
    this.service.selectSpeedwayEvent.subscribe((data) => {
      this.speedway = { ...data };
    });
    this.countryService.listAll().subscribe((countrys) => {
      this.countrys = countrys;
    });
  }

  public getSpeedwaysByName() {
    this.service.getSpeedwaysByName(this.speedway.name).subscribe((data) => {
      this.speedways = data;
    });
  }

  public showSizeContainer() {
    this.showSizeFilters = true;
    this.showCountryFilters = false;
  }

  public filterBySize() {
    if (this.sizeIn !== undefined && this.sizeFin !== undefined) {
      this.getSpeedwaysBySize(this.sizeIn, this.sizeFin);
    }
  }

  public getSpeedwaysBySize(sizeIn: number, sizeFin: number) {
    this.service.getSpeedwaysBySize(sizeIn, sizeFin).subscribe((data) => {
      this.speedways = data;
    });
    this.showSizeFilters = false;
  }

  public showCountryContainer() {
    this.showCountryFilters = true;
    this.showSizeFilters = false;
  }

  public getSpeedwaysByCountry() {
    if (this.selectedCountry !== undefined) {
      this.service.getSpeedwaysByCountry(this.selectedCountry.id).subscribe((data) => {
        this.speedways = data;
      });
      this.showCountryFilters = false;
    }
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
