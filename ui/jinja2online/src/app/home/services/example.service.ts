import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { JinjaRequest } from '../models/jinja_request.interface';

@Injectable()
export class ExampleService {

  constructor(private http: HttpClient) {}

  get(): Observable<JinjaRequest> {

    return this.http.get<JinjaRequest>('/api/example').pipe(
      catchError(response => throwError("Failed to get example"))
    )

  }

}