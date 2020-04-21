import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SigninPage } from './signin.page';

import { SigninPageRoutingModule } from './signin-routing.module';

const routes: Routes = [
  {
    path: '',
    component: SigninPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SigninPageRoutingModule
  ],
  declarations: [SigninPage]
})
export class SigninPageModule {}
