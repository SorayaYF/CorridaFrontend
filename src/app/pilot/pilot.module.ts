import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotComponent } from './components/pilot/pilot.component';
import { PilotFormComponent } from './components/pilot-form/pilot-form.component';
import { PilotTableComponent } from './components/pilot-table/pilot-table.component';



@NgModule({
  declarations: [
    PilotComponent,
    PilotFormComponent,
    PilotTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PilotModule { }
