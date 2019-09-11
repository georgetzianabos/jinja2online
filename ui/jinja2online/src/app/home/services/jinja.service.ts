import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { JinjaResult } from '../models/jinja_results.interface';
import { JinjaRequest } from '../models/jinja_request.interface';

@Injectable()
export class JinjaService {

  constructor(private http: HttpClient) {}

  process(jinjaRequest: JinjaRequest): Observable<JinjaResult> {
    
    let request;
    
    if (jinjaRequest.json === '' && jinjaRequest.template === '') {
      return of({ result: ''});
    }
    
    try {
      request = { values: JSON.parse(jinjaRequest.json), template: jinjaRequest.template };
    } catch(e) {
      return throwError({ error: e.message});
    }

    return this.http.post<JinjaResult>('/api/process', request).pipe(
      catchError(response => throwError({ error: response.error.error}))
    )

  }  

}