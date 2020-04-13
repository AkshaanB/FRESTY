import { ProductsComponent } from './products/products.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'getstarted',component:GetStartedComponent},
  {path:'getstarted/product',component:ProductsComponent},
  {path:'getstarted/product/signin',component:SignInComponent},
  {path:'getstarted/product/signin/viewhistory',component:ViewHistoryComponent},
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
