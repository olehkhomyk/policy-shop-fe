import { Route } from '@angular/router';
import { HandleLiqpayComponent } from './handle-liqpay.component';

export const handleLiqpayState: Route = {
  path: 'liqpay-result/:bought',
  component: HandleLiqpayComponent
};
