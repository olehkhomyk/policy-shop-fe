import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BusinessStyle } from '../other/BusinessStyle';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent extends BusinessStyle {

  @Input()
  count = 0;

  @Input()
  image: string;

  @Output()
  add: EventEmitter<void> = new EventEmitter();

  @Output()
  remove: EventEmitter<void> = new EventEmitter();
}
