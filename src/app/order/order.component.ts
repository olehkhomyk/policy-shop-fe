import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DoOrderComponent } from '../do-order/do-order.component';
import { Candidate } from '../other/models';
import { candidatesList } from '../other/constant';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  public candidates: Array<Candidate> = [...candidatesList];

  constructor(public dialog: MatDialog) {
  }

  public addCount(candidate: Candidate): void {
      candidate.count++;
  }

  public removeCount(candidate: Candidate): void {
    if (candidate.count > 0) {
      candidate.count--;
    }
  }

  openDialog(): void {
    console.log(this.candidates);
    const dialogRef = this.dialog.open(DoOrderComponent, {
      width: '600px',
      data: {
        candidates: this.candidates
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // alert('Успішне Замовлення');
    });
  }
}
