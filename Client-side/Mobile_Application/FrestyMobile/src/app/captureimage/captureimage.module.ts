import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaptureimagePageRoutingModule } from './captureimage-routing.module';

import { CaptureimagePage } from './captureimage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaptureimagePageRoutingModule
  ],
  declarations: [CaptureimagePage]
})
export class CaptureimagePageModule {}
