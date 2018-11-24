import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private url: string = '/assets/email.php';
  public message: any = {};

  constructor(private http: HttpClient) {}

  public sendEmail(): Observable<any>{
    const obs = this.http.post(this.url, this.message);

    obs.subscribe((response) => {
      debugger;
    });

    return obs;
  }

 }
