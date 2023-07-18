import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss'],
})
export class CountryTableComponent implements OnInit {
  public countrys!: Country[];

  constructor(private service: CountryService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((countrys) => {
      this.countrys = countrys;
    });
  }

  public editCountry(country: Country) {
    let newCountry = {
      id: country.id,
      name: country.name,
    };
    this.service.selectCountry(newCountry);
  }

  public deleteCountry(country: Country) {
    this.service.delete(country).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.countrys = data;
      });
    });
  }
}
