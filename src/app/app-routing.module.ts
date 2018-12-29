import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { landingState } from './landing/landing.state';
import { defaultState } from './other/default.state';
import { orderState } from './order/order.state';
import { changeRating } from './change-rating/change-rating.state';
import { successState } from './success/success.state';
import { doOrderState } from './do-order-mobile/do-order-mobile.state';
import { handleLiqpayState } from './handle-liqpay/handle-liqpay.state';

const routes: Routes = [
  defaultState,
  landingState,
  orderState,
  changeRating,
  successState,
  doOrderState,
  handleLiqpayState
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
