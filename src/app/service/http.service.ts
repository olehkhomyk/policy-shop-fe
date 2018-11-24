import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../other/constant';
import { map, tap } from 'rxjs/operators';
import { Rating } from '../other/models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = API_URL;

  constructor(private http: HttpClient) { }

  public login(credential): Observable<any> {
    return this.http.post(`${this.url}/login`, credential)
      .pipe(tap(({token}) => {
        this.authToken = token;
      }));
  }

  public get isAdmin(): boolean {
    return !!this.authToken;
  }

  private get authToken(): string {
    return localStorage.authToken;
  }

  private set authToken(token) {
    localStorage.authToken = token;
  }

  public resetToken(): void {
    this.authToken = '';
  }

  public updateRating(data: Rating): Observable<Rating> {
    const _header = new HttpHeaders();
    const headers = _header
      .append('Content-Type', 'application/json')
      .append('x-access-token', this.authToken);

    return this.http.post<Rating>(`${this.url}/rating`, data, {headers});
  }

  public getRating(): Observable<Rating> {
    const _header = new HttpHeaders();
    const headers = _header
      .append('Content-Type', 'application/json')
      .append('x-access-token', this.authToken);

    return this.http.get<Rating>(`${this.url}/rating`, {headers})
      .pipe(tap(({isAdmin}) => {
        if (!isAdmin) {
          this.resetToken();
        }
      }));
  }

  /**
   * Return observable with list of cities where Nova Poshta exist.
   */
  public getCities(params = {}): Observable<any[]> {
      return this.http.get(`${this.url}/cities`, {params})
        .pipe(
          map((data: Array<any>) => data.map((item) => new City(item)))
        );
  }

  /**
   * Return observable with list of Nova Poshta Address.
   */
  public getAddress(params = {}): Observable<any> {
    return this.http.get(`${this.url}/address`, {params})
      .pipe(
        map((data: Array<any>) => data.map((item) => new Address(item)))
      );
  }
}

export class City {
  constructor(city) {
    Object.assign(this, city);
  }
}

export class Address {
  constructor(address) {
    Object.assign(this, address);
  }
}

