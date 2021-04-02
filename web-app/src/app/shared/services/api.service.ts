import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Test, TestResults } from '../models/test-models';

@Injectable({
  providedIn: 'root'
})

export class  ApiService {
 
  constructor(private http: HttpClient) {}

  getTestList(): Observable<Test[]> {
    return this.http.get<Test[]>('/api/get-test-list')
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Get the client IP from the server and store it in local storage
   * Return - true if found, false otherwise
   */
  runTests(ids: string[]): Observable<TestResults[]> {
    return this.http.post<TestResults[]>('/api/run-tests', ids)
    .pipe(catchError(this.errorHandler));
  }

  addTest(test: FormData): Observable<string> {
    console.log(test);
    return this.http.post<string>('/api/upload-test', {test}, {
      reportProgress: true,
      responseType: 'json'
    })
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}
