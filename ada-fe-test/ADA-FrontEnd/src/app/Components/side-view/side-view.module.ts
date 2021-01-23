import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideViewComponent } from './side-view.component';
import { SideViewRoutingModule } from './side-view-routing.module';
import { RouterModule } from '@angular/router';
import { TreeViewModule } from '@progress/kendo-angular-treeview';



@NgModule({
  declarations: [
    SideViewComponent
  ],
  imports: [
    CommonModule,
    SideViewRoutingModule,
    RouterModule,
    TreeViewModule
  ],
  exports: []
})
export class SideViewModule { }
