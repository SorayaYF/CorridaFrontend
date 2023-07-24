import { Country } from 'src/app/country/models/country';
import { Team } from 'src/app/team/models/team';

export interface Pilot {
  id: number;
  name: string;
  country: Country;
  team: Team;
}
