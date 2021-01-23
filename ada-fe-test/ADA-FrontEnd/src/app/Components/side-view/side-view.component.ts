import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { SideViewService } from './side-view.service';

@Component({
  selector: 'app-side-view',
  templateUrl: './side-view.component.html',
  styleUrls: ['./side-view.component.scss']
})
export class SideViewComponent implements OnInit {
  public sideViewList;
  public items = [null];
  public titleId: number;

  constructor(private sideViewService: SideViewService) { }

  ngOnInit() {
    this.getSideViewData();
  }

  public getSideViewData() {
    this.sideViewService.getSideViewNodes().subscribe((data) => {
      this.sideViewList = data;
      this.sideViewList.forEach((element) => {
        element['items'] = this.items;
      });
    },
    error => {
      console.log(error);
    });
  }

  public getDetailView(event) {
    this.titleId = event.dataItem.id;
  }

  public onExpand(args: any): void {
    console.log(args);
  }

}
