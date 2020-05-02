import { History } from './../History';
import { MyserviceService } from './../myservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PredictedImages} from '../models/PredictedImages';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {

  predictedImages: PredictedImages[];

  constructor(private myserviceService:MyserviceService,private _router:Router) { }

  ngOnInit() {
    this.myserviceService.getAllTheHistory().subscribe(
      response => {
        console.log(response);
        this.predictedImages = response;
      }
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.clear();
    this._router.navigate(['/getstarted/product/signin']);
  }

}
