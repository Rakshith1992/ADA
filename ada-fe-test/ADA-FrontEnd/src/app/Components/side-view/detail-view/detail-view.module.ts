import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailViewComponent } from './detail-view.component';
import { DetailViewRoutingModule } from './detail-view-routing.module';



@NgModule({
  declarations: [ DetailViewComponent ],
  imports: [
    CommonModule,
    DetailViewRoutingModule
  ]
})
export class DetailViewModule { }
