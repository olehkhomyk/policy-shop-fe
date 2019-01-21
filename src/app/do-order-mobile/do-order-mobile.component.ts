import { Component } from '@angular/core';
import { DoOrderComponent } from '../do-order/do-order.component';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';
import { defaultState } from '../other/default.state';

@Component({
  selector: 'app-do-order-mobile',
  templateUrl: './do-order-mobile.component.html',
  styleUrls: ['./do-order-mobile.component.scss']
})
export class DoOrderMobileComponent extends DoOrderComponent {
  constructor(protected fb: FormBuilder,
              protected service: HttpService,
              protected router: Router
  ) {
    super(fb, service, router);
  }

  public cancel(): void {
    this.router.navigate([defaultState.path]);
  }
}
