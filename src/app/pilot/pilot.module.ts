import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotComponent } from './components/pilot/pilot.component';
import { PilotTableComponent } from './components/pilot-table/pilot-table.component';
import { PilotFormComponent } from './components/pilot-form/pilot-form.component';



@NgModule({
  declarations: [
    PilotComponent,
    PilotTableComponent,
    PilotFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PilotModule { }
