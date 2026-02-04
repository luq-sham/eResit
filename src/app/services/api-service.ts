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

  getPaymentDetails(data?: any): Observable<any> {
    const url = this.apiUrl + 'api/getPaymentDetails?page=' + data.page + '&record=' + data.record;
    return this.http.get(url);
  }

  getPaymentDetailsFiltered(data?: any): Observable<any> {
    const url = this.apiUrl + 'api/getPaymentDetails?page=' + data.page + '&record=' + data.record + '&search=' + data.search;
    return this.http.get(url);
  }

  postAddPayments(data: any): Observable<any> {
    const url = this.apiUrl + 'api/postAddPayments';
    return this.http.post(url, data);
  }

}
