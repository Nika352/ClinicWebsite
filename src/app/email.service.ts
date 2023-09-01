import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './account';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler'
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  ngOnInit(){

  }

  private apiUrl = 'https://localhost:7283';

  addCode(email: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const apiUrl = `https://localhost:7283/api/Verification/AddCode?email=${encodeURIComponent(email)}`;
    const options = { headers: headers };
   
    return this.http.post(apiUrl, options);
  }

  checkCode(email : string, code : string){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const apiUrl = `https://localhost:7283/api/Verification/CheckCode?email=${encodeURIComponent(email)}&codeToCheck=${encodeURIComponent(code)}`;
    const options = { headers: headers };
   
    return this.http.get<boolean>(apiUrl, options);
  }

  addTwoStepCode(email: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const apiUrl = `https://localhost:7283/api/Verification/AddTwoStepCode?email=${encodeURIComponent(email)}`;
    const options = { headers: headers };
   
    return this.http.post(apiUrl, options);
  }


  checkTwoStepCode(email : string, code : string){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const apiUrl = `https://localhost:7283/api/Verification/CheckTwoStepCode?email=${encodeURIComponent(email)}&codeToCheck=${encodeURIComponent(code)}`;
    const options = { headers: headers };
   
    return this.http.get<boolean>(apiUrl, options);
  }

  isVerified(email : string){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const apiUrl = `https://localhost:7283/api/Verification/IsVerified?email=${encodeURIComponent(email)}`;
    const options = { headers: headers };
   
    return this.http.get<boolean>(apiUrl, options);
  }

  verify(email: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const apiUrl = `https://localhost:7283/api/Verification/Verify?email=${encodeURIComponent(email)}`;
    const options = { headers: headers };
   
    return this.http.post(apiUrl, options);
  }

}
