import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {

  constructor() { }

  public getHeaders() {
    return new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
  }
}
