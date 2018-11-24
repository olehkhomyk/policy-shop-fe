import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { landingState } from './landing/landing.state';
import { defaultState } from './other/default.state';
import { orderState } from './order/order.state';
import { changeRating } from './change-rating/change-rating.state';

const routes: Routes = [
  defaultState,
  landingState,
  orderState,
  changeRating
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
