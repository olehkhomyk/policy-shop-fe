import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DoOrderComponent } from '../do-order/do-order.component';
import { Candidate } from '../other/models';
import { generateCandidates } from '../other/constant';
import { BusinessStyle } from '../other/BusinessStyle';
import { Router } from '@angular/router';
import { successState } from '../success/success.state';
import { isMobile } from '../other/helper';
import { HttpService } from '../service/http.service';
import { doOrderState } from '../do-order-mobile/do-order-mobile.state';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends BusinessStyle implements OnInit {

  public candidates: Array<Candidate> = generateCandidates();

  constructor(public dialog: MatDialog, private router: Router, private service: HttpService) {
    super();
  }

  ngOnInit(): void {
    this.checkOrders();
  }

  public addCount(candidate: Candidate): void {
    candidate.count++;
    this.updateOrderStore();
  }

  public removeCount(candidate: Candidate): void {
    if (candidate.count > 0) {
      candidate.count--;
      this.updateOrderStore();
    }
  }

  public get isOrderAvailable(): boolean {
    return this.candidates
      .reduce((acc: number, item: Candidate) => acc += item.count, 0) > 0;
  }

  public makeOrder(): void {
    if (isMobile()) {
      this.redirectToOrderForm();
    } else {
      this.openDialog();
    }
  }

  private checkOrders(): void {
    if (localStorage.order) {
      this.candidates = JSON.parse(localStorage.order);
    }
  }

  private updateOrderStore(): void {
    localStorage.order = JSON.stringify(this.candidates);
  }

  private redirectToOrderForm(): void {
    this.service.updateCandidates(this.candidates);
    this.router.navigate([doOrderState.path]);
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(DoOrderComponent, {
      width: '600px',
      data: {
        candidates: this.candidates
      }
    });

    dialogRef.afterClosed().subscribe((checker) => {
      if (checker) {
        this.router.navigate([successState.path]);
      }
    });
  }
}
