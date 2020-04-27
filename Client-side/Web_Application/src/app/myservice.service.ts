import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

import { History } from './History';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  hello:any;output: JSON;

  constructor(private _http: HttpClient) { }

  login(body:any){
    return this._http.post('http:localhost:3000/login', body,{
      observe:'body'
    });
  }

  getUserName(){
    return this._http.get('http://localhost:8080/vehicle1', {
       observe:'body',
       params: new HttpParams().append('token', localStorage.getItem('token'))
    }); 
  }
  
  getAllTheHistory(){
      return this._http.get<History[]>('http://localhost:8080/vehicle1')
    }

  // getAllTheHistory(): Observable<any>{
  //   return this._http.get('http://localhost:8080/vehicle1');
  // }

}
