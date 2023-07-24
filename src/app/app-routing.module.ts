import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { UserComponent } from './user/components/user/user.component';
import { CountryComponent } from './country/components/country/country.component';
import { SpeedwayComponent } from './speedway/components/speedway/speedway.component';
import { TeamComponent } from './team/components/team/team.component';
import { PilotComponent } from './pilot/components/pilot/pilot.component';
import { ChampionshipComponent } from './championship/components/championship/championship.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'countrys', component: CountryComponent },
  { path: 'speedways', component: SpeedwayComponent },
  { path: 'teams', component: TeamComponent },
  { path: 'pilots', component: PilotComponent },
  { path: 'championships', component: ChampionshipComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
