import { Country } from 'src/app/country/models/country';

export interface Speedway {
  id: number;
  name: string;
  size: number;
  country: Country;
}
