import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {

  @Input()
  count = 0;

  @Input()
  imageUrl: string;

  @Output()
  add: EventEmitter<void> = new EventEmitter();

  @Output()
  remove: EventEmitter<void> = new EventEmitter();

  constructor() {
  }
}
