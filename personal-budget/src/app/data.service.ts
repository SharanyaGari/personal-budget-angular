import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { HomepageComponent } from './homepage/homepage.component';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor(private http: HttpClient) { }

 getData(): Observable<any> {
    return this.http.get('http://localhost:80/budget')
 }

}
