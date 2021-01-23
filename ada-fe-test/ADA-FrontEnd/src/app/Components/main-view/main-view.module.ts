import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { MainViewRoutingModule } from './main-view-routing.module';
import { MainViewComponent } from './main-view.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { HighlightPipe } from 'src/app/shared/pipes/highlight.pipe';




@NgModule({
  declarations: [
    MainViewComponent,
    DetailViewComponent,
    HighlightPipe,
  ],
  imports: [
    CommonModule,
    TreeViewModule,
    MainViewRoutingModule,
    RouterModule
  ],
  exports: [
  ]
})
export class MainViewModule { }
