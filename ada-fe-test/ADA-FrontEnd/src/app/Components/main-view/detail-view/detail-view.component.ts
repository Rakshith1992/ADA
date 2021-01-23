import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainViewService } from '../main-view.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  public titleId: any;
  public subscription: Subscription;
  public titleSpecificData;
  public variableArray: any;
  public highlightValue: any;

  constructor(private mainViewService: MainViewService ) {

   }

  ngOnInit() {
    this.getVariableValue();
    this.mainViewService.titleIdValue$.subscribe((data) => {
      this.titleId = data;
      this.titleByID(this.titleId);
    });
    this.mainViewService.highlight$.subscribe((data) => {
      this.highlightValue = data;
    });

  }

  public titleByID(titleId) {
    this.mainViewService.getTitleByID(titleId).subscribe((data) => {
      this.titleSpecificData = data;
      this.replaceInput();
    },
    error => {
      console.log(error);
    });
  }

  public getVariableValue() {
    this.mainViewService.getVariableData().subscribe((data) => {
      this.variableArray = data;
    });
  }

  public replaceInput() {
    const mapVariables = {};
    this.variableArray.forEach(element => {
      mapVariables[element.id] = element.name;
    });
    this.titleSpecificData[0].content.forEach(element => {
      if (element.type === 'text') {
        element.body = element.body.replaceAll(/[|{}]/g, '');
        element.body = element.body.replace(/something/gi, '');
        const re = new RegExp(Object.keys(mapVariables).join("|"),"gi");
        element.body = element.body.replace(re, function(matched){
          return mapVariables[matched];
        });
      }
    });
  }


}




