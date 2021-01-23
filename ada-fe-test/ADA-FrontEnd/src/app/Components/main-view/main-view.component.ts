import { element } from 'protractor';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MainViewService } from './main-view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  public sideViewDataList;
  public sideViewData;
  public items = [null];
  public titleId: number;
  public displayDetailView: boolean = false;
  public variable: any;
  public titleSpecificData: any;
  public hashData = [];

  constructor(private mainViewService: MainViewService, private router: Router) {
  }

  ngOnInit() {
    this.getSideViewData();
    this.variableData();
  }

  public getSideViewData() {
    this.mainViewService.getSideViewNodes().subscribe((data) => {
      this.sideViewData =  data;
      this.sideViewData.forEach((element) => {
        element['items'] = this.items;
      });
    },
    error => {
      this.router.navigateByUrl('/error');
    });
  }

  public getDetailView(event) {
    this.titleId = event.dataItem.id;
    this.mainViewService.titleIDValue(this.titleId);
    this.displayDetailView = true;
  }

  public onExpand(args: any): void {
    const index = parseInt(args.index) + 1;
    let childrenId: any;
    this.mainViewService.getTitleByID(args.dataItem.id).subscribe((data) => {
      childrenId = data[0].connections;
      this.getData(childrenId, index);
    },
    error => {
      this.router.navigateByUrl('/error');
    });
  }

  public getData(children, index) {
    this.hashData = [];
    let titleObject = this.mainViewService.titleObject;
    this.sideViewData.forEach(element => {
      if (index === element.id) {
        let hashObj = new Object();
        hashObj['id'] = element.id;
        hashObj['title'] = titleObject[element.id];
        hashObj['parentId'] = null;
        this.hashData.push(hashObj);
      }
    });
    if (children != null) {
      children.forEach(element => {
        let hashObj = new Object();
        hashObj['id'] = element;
        hashObj['title'] = titleObject[element];
        hashObj['parentId'] = index;
        this.hashData.push(hashObj);
      });
      const idMapping = this.hashData.reduce((acc, el, i) => {
        acc[el.id] = i;
        return acc;
      }, {});

      let root;
      const result = [];
      this.hashData.forEach(el => {
      // Handle the root element
      if (el.parentId === null) {
        root = el;
        return;
      }
      // Use our mapping to locate the parent element in our data array
      const parentEl = this.hashData[idMapping[el.parentId]];
      // Add our current el to its parent's `children` array
      parentEl.items = [...(parentEl.items || []), el];
      });
      result.push(root);
      const output = this.sideViewData.map(obj => result.find(o => o.id === obj.id) || obj);
      this.sideViewData = output;
    }

  }

  public applyFilter(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.mainViewService.updateHighlightValue(searchValue);
    if (searchValue !== '') {
      this.mainViewService.getSearchTitles(searchValue).subscribe((data) => {
        this.sideViewData = data;
        this.sideViewData.forEach((element) => {
          element['items'] = this.items;
        });
      },
      error => {
        this.router.navigateByUrl('/error');
      });
    }
  }

  public variableData() {
    this.mainViewService.getVariableData().subscribe(() => {
    },
    error => {
      this.router.navigateByUrl('/error');
    });
  }
}
