import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

import { History } from './History';
import {PredictedImages} from './models/PredictedImages';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  hello:any;output: JSON;

  constructor(private _http: HttpClient) { }

  login(body:any){
    return this._http.post('https://login-insightful-grysbok-fb.cfapps.eu10.hana.ondemand.com/user/login', body,{
      observe:'body'
    });
  }

  getAllTheHistory(){
      return this._http.get<PredictedImages[]>('http://imageupload-unexpected-otter-ow.cfapps.eu10.hana.ondemand.com/predictedImage')
  }

}
