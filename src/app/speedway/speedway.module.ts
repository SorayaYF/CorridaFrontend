import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedwayComponent } from './components/speedway/speedway.component';
import { SpeedwayFormComponent } from './components/speedway-form/speedway-form.component';
import { SpeedwayTableComponent } from './components/speedway-table/speedway-table.component';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../country/services/country.service';

@NgModule({
  declarations: [
    SpeedwayComponent,
    SpeedwayFormComponent,
    SpeedwayTableComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [SpeedwayComponent],
})
export class SpeedwayModule {}
