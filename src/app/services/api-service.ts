import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getCardValue(): Observable<any> {
    const url = this.apiUrl + 'api/getCardsValue';
    return this.http.get(url);
  }

}
