import { Component, Input, OnInit } from '@angular/core';
import { Candidates, Rating } from '../other/models';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input()
  private rating: Rating;

  public candidates: Candidates;

  public ratingSize = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  constructor() { }

  private static calcCandidates({candidates, sum}: Rating): Candidates {
    const cloned = {...candidates};
    const props = Object.keys(cloned);

    props.forEach((prop: string) => {
      cloned[prop] = `${RatingComponent.calcRating(cloned[prop], sum)}%`;
    });

    return cloned;
  }

  private static calcRating(count: number, sum: number): number {
    return (count * 100) / sum;
  }

  ngOnInit() {
    if (this.rating) {
      this.candidates = RatingComponent.calcCandidates(this.rating);
    }
  }
}
