import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Config } from 'src/app/app.constant';
import { Titles, TitlesByID } from 'src/app/models/side-view-model';
import { HttpHeaderService } from 'src/app/shared/services/http-header.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainViewService {
  public subject = new Subject();
  private titleIDDataSource$ = new BehaviorSubject(0);
  public titleIdValue$ = this.titleIDDataSource$.asObservable();
  private highlightDataSource$ = new BehaviorSubject('');
  public highlight$ = this.highlightDataSource$.asObservable();
  private variableValueDataSource$ = new BehaviorSubject('');
  public variableValue$ = this.variableValueDataSource$.asObservable();
  public variableData: any;
  public titleObject: any;

  public handleError(error: any) {
    return throwError(error.message || 'Server Error');
  }

  constructor(private http: HttpClient, private httpHeaderService: HttpHeaderService ) { }

  public getSideViewNodes(): Observable<Titles> {
    return this.http.get<Titles>(`${environment.Endpoint_url}${Config.API.Methods.GetListOfTitles}`,
              { headers: this.httpHeaderService.getHeaders() })
             .pipe(
              map(response => {
                this.createTitleHashMap(response);
                return response;
              }),
              catchError(this.handleError));
  }

  public getTitleByID(titleByID: number): Observable<TitlesByID> {
    return this.http.get<TitlesByID>(`${environment.Endpoint_url}${Config.API.Methods.GetTitlesByID}${titleByID}`,
              { headers: this.httpHeaderService.getHeaders() })
             .pipe(
              map(response => {
                return response;
              }),
              catchError(this.handleError));
  }

  public getSearchTitles(searchValue: string): Observable<TitlesByID> {
    const searchObject = {};
    searchObject['query'] = searchValue;
    return this.http.post<TitlesByID>(`${environment.Endpoint_url}${Config.API.Methods.GetSearchTitle}`, searchObject,
              { headers: this.httpHeaderService.getHeaders() })
             .pipe(
              map(response => {
                return response;
              }),
              catchError(this.handleError));
  }

  public getVariableData()  {
    return this.http.get(`${environment.Endpoint_url}${Config.API.Methods.GetVariableData}`,
              { headers: this.httpHeaderService.getHeaders() })
             .pipe(
              map(response => {
                // this.variableData = response;
                return response;
              }),
              catchError(this.handleError));
  }

  /* public getHashMapValue(encrptedData) {
    this.variableData.forEach((element) => {
      if (element.id === encrptedData ) {
        this.updateHighlightValue(element.name);
      }
    });
  } */

  public titleIDValue(value: number) {
    this.titleIDDataSource$.next(value);
  }

  public updateHighlightValue(value: any) {
    this.highlightDataSource$.next(value);
  }

  public createTitleHashMap(allTitles) {
    this.titleObject = {};
    allTitles.forEach(element => {
      this.titleObject[element.id] = element.title;
    });
  }

 /*  public updateVariableValue(value: any) {
    this.variableValueDataSource$.next(value);
  } */
}
