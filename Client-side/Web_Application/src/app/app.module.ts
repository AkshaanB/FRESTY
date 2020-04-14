import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import {HttpClientModule} from '@angular/common/http';
// import {DataserviceService} from '../app/dataservice.service';
import { GetStartedComponent } from './get-started/get-started.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    AppComponent,
    GetStartedComponent,
    SignInComponent,
    ViewHistoryComponent,
    ProductsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,    
    // HttpClientModule,
  ],

  providers:[],
  // providers: [DataserviceService],
  bootstrap: [AppComponent]
})

export class AppModule { }
