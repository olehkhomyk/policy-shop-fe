import { Component, OnInit } from '@angular/core';
import { DoOrderComponent } from '../do-order/do-order.component';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-do-order-mobile',
  templateUrl: './do-order-mobile.component.html',
  styleUrls: ['./do-order-mobile.component.scss']
})
export class DoOrderMobileComponent extends DoOrderComponent implements OnInit {

  constructor(protected fb: FormBuilder,
              protected service: HttpService,
              protected router: Router
  ) {
    super(fb, service, router);
  }
}
