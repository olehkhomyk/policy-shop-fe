import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from './shared/shared.module';
import { OrderComponent } from './order/order.component';
import { ChangeRatingComponent } from './change-rating/change-rating.component';
import { RatingComponent } from './rating/rating.component';
import { DoOrderComponent } from './do-order/do-order.component';
import { HttpService } from './service/http.service';
import { OrderItemComponent } from './order-item/order-item.component';
import { SuccessComponent } from './success/success.component';
import { DoOrderMobileComponent } from './do-order-mobile/do-order-mobile.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    OrderComponent,
    ChangeRatingComponent,
    RatingComponent,
    DoOrderComponent,
    OrderItemComponent,
    SuccessComponent,
    DoOrderMobileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [DoOrderComponent],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
