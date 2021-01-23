import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Config } from 'src/app/app.constant';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpHeaderService } from 'src/app/shared/services/http-header.service';
import { Titles } from 'src/app/models/side-view-model';

@Injectable({
  providedIn: 'root'
})
export class SideViewService {

  public handleError(error: any) {
    return throwError(error.message || 'Server Error');
  }

  constructor(private http: HttpClient, private httpHeaderService: HttpHeaderService ) { }

  public getSideViewNodes(): Observable<Titles> {
    return this.http.get<Titles>(`${environment.Endpoint_url}${Config.API.Methods.GetListOfTitles}`,
              { headers: this.httpHeaderService.getHeaders() })
             .pipe(
              map(response => {
                return response;
              }),
              catchError(this.handleError));
  }
}
