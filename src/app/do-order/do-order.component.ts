import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { flatMap, map, debounceTime, startWith, tap } from 'rxjs/operators';
import { City, HttpService } from '../service/http.service';
import { COUNT_TO_REQUIERD_PAY, PRICE, SEARCH_DROPDOWN_DELAY } from '../other/constant';
import { Candidate } from '../other/models';
import { BusinessStyle } from '../other/BusinessStyle';
import { Router } from '@angular/router';
import { successState } from '../success/success.state';

@Component({
  selector: 'app-do-order',
  templateUrl: './do-order.component.html',
  styleUrls: ['./do-order.component.scss']
})
export class DoOrderComponent extends BusinessStyle implements OnInit {

  public orderForm: FormGroup;
  public cityOptions$: Observable<any[]>;
  public addressOptions$: Observable<any[]>;

  constructor(protected fb: FormBuilder,
              protected service: HttpService,
              protected router: Router,
              public dialogRef?: MatDialogRef<DoOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data?: any) {
    super();
  }

  public get fullPrice(): number {
    const count = DoOrderComponent.reduceOrder(this.candidates);

    return (count * PRICE);
  }

  public get isPaymentRequired(): boolean {
    return DoOrderComponent.reduceOrder(this.candidates)  > COUNT_TO_REQUIERD_PAY;
  }

  protected static reduceOrder(candidates: Array<Candidate>): number {
    return candidates.reduce((acc, item: Candidate) => acc += item.count, 0);
  }

  protected initForm(): void {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  protected get candidates(): Array<Candidate> {
    return  this.data && this.data.candidates || this.service.candidatesValue || [];
  }

  ngOnInit() {
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

  public saveOrder(form): void {
    const data = form.value;
    if (form.invalid) {
      return;
    }

    const reqData = new Order(
      data.name,
      data.surname,
      data.address.Description,
      data.phone,
      data.city.Description,
      this.candidates);

    this.service.saveOrder(reqData)
      .subscribe((response) => {
        if (this.dialogRef) {
          this.dialogRef.close(true);
        } else {
          this.router.navigate([successState.path]);
        }
      });
  }

  public close(): void {
    this.dialogRef.close();
  }
}

export class Order {
  name: string;
  surname: string;
  address: string;
  city: string;
  phone: number;
  candidates: Array<Candidate>;

  constructor(name: string, surname: string, address: string, phone: number, city: string, candidates: Array<Candidate>) {
    this.name = name;
    this.surname = surname;
    this.address = address;
    this.city = city;
    this.phone = phone;
    this.candidates = candidates;
  }
}
