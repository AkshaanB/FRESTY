import { History } from './History';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const options = {
    headers: new HttpHeaders({ 'content-type': 'application/json'})
  };

  @Injectable({
    providedIn: 'root'
  })

  export class DataserviceService {
    hello:any;output: JSON;
  
    constructor(private http:HttpClient) { }
    
    getAllTheHistory(): Observable<any>{
      return this.http.get('http://localhost:8080');
    }

    // getAllTheHistory(){
    //     return this.http.get<History[]>('http://localhost:8080/vehicle1')
    //   }
}