import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './account';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler'
import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  ngOnInit(){

  }

  

  private apiUrl = 'https://localhost:7283';

  putAccountInDb(account: Account): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = { headers: headers };
    const url = 'https://localhost:7283/putAccount';
    return this.http.post<any>(url, account, options);
  }

  login(email: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    const apiUrl = `${this.apiUrl}/getAccount?email=${encodeURIComponent(email)}&pass=${encodeURIComponent(password)}`;
    return this.http.get<Account>(apiUrl, options);
  }

  setImage(email: string, img: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    const apiUrl = `https://localhost:7283/setImage`;

    const body = {
      email: email,
      img: img
    };

    return this.http.put<Account>(apiUrl, body, options);
  }

  getDoctors(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
    const apiUrl = `https://localhost:7283/getDoctors`;

    return this.http.get<Account[]>(apiUrl, options);
  }

  getCategoryCount(category: string): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
    const apiUrl = `https://localhost:7283/getCategoryCount?category=${encodeURIComponent(category)}`;

    return this.http.get<number>(apiUrl, options);
  }


}



