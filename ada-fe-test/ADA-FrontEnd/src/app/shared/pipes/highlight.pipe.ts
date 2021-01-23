import { Pipe, PipeTransform } from '@angular/core';
import { MainViewService } from 'src/app/Components/main-view/main-view.service';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  public variable;

  constructor(private mainViewService: MainViewService ) {
  }


  transform(value: any, args: any): any {
    if (!args) {return value;}
    const re = new RegExp(args, 'gi');
    return value.replace(re, '<mark>$&</mark>');
  }

}
