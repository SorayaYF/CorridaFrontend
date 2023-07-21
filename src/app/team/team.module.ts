import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './components/team/team.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { TeamTableComponent } from './components/team-table/team-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TeamComponent,
    TeamFormComponent,
    TeamTableComponent
  ],
  imports: [
    CommonModule, FormsModule
  ], 
  exports: [
    TeamComponent
  ]
})
export class TeamModule { }
