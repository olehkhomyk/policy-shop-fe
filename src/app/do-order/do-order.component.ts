import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { flatMap, map, debounceTime, startWith, tap } from 'rxjs/operators';
import { City, HttpService } from '../service/http.service';
import { COUNT_TO_DISCOUNT, PRICE, PRICE_VS_DISCOUNT, SEARCH_DROPDOWN_DELAY } from '../other/constant';
import { Candidate, Candidates } from '../other/models';

@Component({
  selector: 'app-do-order',
  templateUrl: './do-order.component.html',
  styleUrls: ['./do-order.component.scss']
})
export class DoOrderComponent implements OnInit {

  public orderForm: FormGroup;
  public cityOptions$: Observable<any[]>;
  public addressOptions$: Observable<any[]>;

  private candidates: Candidates;

  constructor(public dialogRef: MatDialogRef<DoOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private service: HttpService) {
  }

  public get fullPrice(): number {
    const count = DoOrderComponent.reduceOrder(this.data.candidates);

    return (count * PRICE);
  }

  public get isDiscount(): boolean {
    return DoOrderComponent.reduceOrder(this.data.candidates)  > COUNT_TO_DISCOUNT;
  }

  public get discountPrice(): number {
    const count = DoOrderComponent.reduceOrder(this.data.candidates);

    return count * PRICE_VS_DISCOUNT;
  }

  private static reduceOrder(candidates: Array<Candidate>): number {
    return candidates.reduce((acc, item: Candidate) => acc += item.count, 0);
  }

  private initForm(): void {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    console.log(this.data);

    this.initForm();

    this.cityOptions$ = this.orderForm.get('city').valueChanges
      .pipe(
        startWith(''),
        debounceTime(SEARCH_DROPDOWN_DELAY),
        map((value) => typeof value === 'string' ? value : value.name),
        tap((value) => {
          if (typeof value === 'string' && this.orderForm.get('address').touched) {
            this.orderForm.get('address').reset();
          }
        }),
        flatMap((term) => this.service.getCities({term}))
      );

    this.addressOptions$ = this.orderForm.get('address').valueChanges
      .pipe(
        startWith(''),
        debounceTime(SEARCH_DROPDOWN_DELAY),
        map((value) => typeof value === 'string' ? value : value.name),
        flatMap((term) => this.service.getAddress({term, city: this.orderForm.get('city').value.Ref}))
      );
  }

  public get isAddressAvailable(): boolean {
    return (this.orderForm.get('city').value instanceof City);
  }

  displayFn(city?: any): string | undefined {
    return city ? city.name : undefined;
  }

  public savaOrder(form): void {
    const data = form.value;
    if (form.invalid) {
      return;
    }

    const reqData = new Order(
      data.name,
      data.surname,
      data.address.Description,
      data.phone,
      data.city,
      this.candidates);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}

class Order {
  name: string;
  surname: string;
  address: string;
  city: string;
  phone: number;
  candidates: Candidates;

  constructor(name, surname, address, phone, city, candidates) {
    this.name = name;
    this.surname = surname;
    this.address = address;
    this.city = city;
    this.phone = phone;
    this.candidates = candidates;
  }
}
