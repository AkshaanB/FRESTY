import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaptureimagePage } from './captureimage.page';

const routes: Routes = [
  {
    path: '',
    component: CaptureimagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaptureimagePageRoutingModule {}
