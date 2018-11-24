import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UNAUTHORIZED_STATUS } from '../other/constant';
import { Rating } from '../other/models';
import { HttpService } from '../service/http.service';


@Component({
  selector: 'app-change-rating',
  templateUrl: './change-rating.component.html',
  styleUrls: ['./change-rating.component.scss']
})
export class ChangeRatingComponent implements OnInit {
  public credentialForm: FormGroup;
  public ratingForm: FormGroup;
  public isWrongCredential = false;

  constructor(private fb: FormBuilder,
              private httpService: HttpService) { }

  ngOnInit() {
    this.initCredentialForm()
      .valueChanges
      .subscribe(() => this.isWrongCredential = false);

    if (!this.ratingForm) {
      this.initRatingForm();
      this.getRating();
    }
  }

  private initRatingForm() {
    this.ratingForm = this.fb.group({
      poroshenko: ['', [Validators.required, Validators.min(0)]],
      zelenskyi: ['', [Validators.required, Validators.min(0)]],
      tymoshenko: ['', [Validators.required, Validators.min(0)]],
      sadovyi: ['', [Validators.required, Validators.min(0)]],
      lyashko: ['', [Validators.required, Validators.min(0)]],
      sum: ['', [Validators.required, Validators.min(0)]],
    });
  }

  private initCredentialForm(): FormGroup {
    return this.credentialForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  public get isAdmin(): boolean {
    return this.httpService.isAdmin;
  }

  public login(form: FormGroup) {
    const credential = form.value;
    this.httpService.login(credential)
      .subscribe(() => this.getRating(), () => this.isWrongCredential = true);
  }

  public logOut(): void {
    this.httpService.resetToken();
  }

  public saveChanges(form: FormGroup): void {
    if (!form.dirty && !form.valid) {
      return;
    }

    const preparedData =  new Rating(form.value);

    this.httpService.updateRating(preparedData)
    .subscribe((data: Rating) => {
      this.updateForm(data);
      alert(`Successfully saved Data!!!`);
    }, (error: HttpErrorResponse) => {
      if (error.status === UNAUTHORIZED_STATUS) {
        this.httpService.resetToken();
        alert('Oops, looks like unauthorized user want to change something... =(.  Login again please');
      }
    });
  }

  private updateForm(data: Rating) {
    this.ratingForm.setValue({...data.candidates, sum: data.sum});
  }

  private getRating(): void {
    this.httpService.getRating()
      .subscribe(this.updateForm.bind(this));
  }
}
