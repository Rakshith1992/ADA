import { MainViewComponent } from './main-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SideViewComponent } from '../side-view/side-view.component';


const routes: Routes = [
  { path: 'mainview', component: MainViewComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class MainViewRoutingModule { }
