import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../other/models';
import { API_URL } from '../other/constant';
import { Router } from '@angular/router';
import { orderState } from '../order/order.state';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  private url = API_URL;
  public rating: Rating;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getRating();
  }

  public doOrder(event: Event): void {
    this.router.navigate([orderState.path], {replaceUrl: true});
  }

  private getRating(): void {
    this.http.get<Rating>(`${this.url}/rating`, {})
      .subscribe((rating: Rating) => this.rating = rating);
  }
}
