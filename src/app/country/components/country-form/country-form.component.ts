import { Component, OnInit } from '@angular/core';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss'],
})
export class CountryFormComponent implements OnInit {
  public countrys!: Country[];
  public country = {} as Country;

  constructor(private service: CountryService) {}

  ngOnInit(): void {
    this.service.selectCountryEvent.subscribe((data) => {
      this.country = { ...data };
    });
  }

  public getCountrysByName() {
    this.service.getCountrysByName(this.country.name).subscribe((data) => {
      this.countrys = data;
    });
  }

  public saveCountry() {
    if (this.country.id) {
      this.service.update(this.country).subscribe((data) => {
        this.country = {} as Country;
      });
    } else {
      this.service.insert(this.country).subscribe((data) => {
        this.country = {} as Country;
      });
    }
  }
}
