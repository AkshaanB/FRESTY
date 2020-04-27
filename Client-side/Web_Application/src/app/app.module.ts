import { MyserviceService } from './myservice.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { ProductsComponent } from './products/products.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],

  providers:[ MyserviceService],
  bootstrap: [AppComponent]
})

export class AppModule { }
