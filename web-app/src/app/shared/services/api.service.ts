import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IpAddress, OperatingSystem } from '../models/system-info-models';
import { TestResults } from '../models/test-models';

@Injectable({
  providedIn: 'root'
})

export class  ApiService {
 
  constructor(private http: HttpClient) {
  }



  /**
   * Get the client IP from the server and store it in local storage
   * Return - true if found, false otherwise
   */
  runSingleTest(id: string): Observable<TestResults> {
    return this.http.post<TestResults>('/api/run-single-test', id)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}
