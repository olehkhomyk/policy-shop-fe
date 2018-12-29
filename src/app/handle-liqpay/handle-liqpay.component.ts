import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LiquPayResult } from '../other/constant';

@Component({
  selector: 'app-handle-liqpay',
  templateUrl: './handle-liqpay.component.html',
  styleUrls: ['./handle-liqpay.component.scss']
})
export class HandleLiqpayComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        const status: LiquPayResult | any = params.get('bought');
        this.handleResult(status);
      });
  }

  private handleResult(status: LiquPayResult) {
    switch (status) {
      case LiquPayResult.Success:
        alert('SUCCESS');
        break;
      case LiquPayResult.Failed:
        alert('FAILED');
        break;
      default:
        // Nothing.
    }
  }
}
