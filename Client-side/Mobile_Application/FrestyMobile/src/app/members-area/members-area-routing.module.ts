import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersAreaPage } from './members-area.page';

const routes: Routes = [
  {
    path: '',
    component: MembersAreaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersAreaPageRoutingModule {}
