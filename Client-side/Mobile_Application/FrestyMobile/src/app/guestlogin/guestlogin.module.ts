import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestloginPageRoutingModule } from './guestlogin-routing.module';

import { GuestloginPage } from './guestlogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestloginPageRoutingModule
  ],
  declarations: [GuestloginPage]
})
export class GuestloginPageModule {}
