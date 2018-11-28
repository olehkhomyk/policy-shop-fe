import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DoOrderComponent } from '../do-order/do-order.component';
import { Candidate } from '../other/models';
import { candidatesList, resetCandidatesCount } from '../other/constant';
import { BusinessStyle } from '../other/BusinessStyle';
import { Router } from '@angular/router';
import { successState } from '../success/success.state';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends BusinessStyle {

  public candidates: Array<Candidate> = resetCandidatesCount(candidatesList);

  constructor(public dialog: MatDialog, private router: Router) {
    super();
  }

  public addCount(candidate: Candidate): void {
      candidate.count++;
  }

  public removeCount(candidate: Candidate): void {
    if (candidate.count > 0) {
      candidate.count--;
    }
  }

  public get isDialogAvailable(): boolean {
    return this.candidates
      .reduce((acc: number, item: Candidate) => acc += item.count, 0) > 0;
  }

  openDialog(): void {
    console.log(this.candidates);
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
