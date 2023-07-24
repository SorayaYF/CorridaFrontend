import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionshipComponent } from './components/championship/championship.component';
import { ChampionshipFormComponent } from './components/championship-form/championship-form.component';
import { ChampionshipTableComponent } from './components/championship-table/championship-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChampionshipComponent,
    ChampionshipFormComponent,
    ChampionshipTableComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [ChampionshipComponent],
})
export class ChampionshipModule {}
