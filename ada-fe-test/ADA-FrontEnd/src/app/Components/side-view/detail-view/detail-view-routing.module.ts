import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailViewComponent } from './detail-view.component';

const routes: Routes = [
  { path: 'detailview', component: DetailViewComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DetailViewRoutingModule { }
