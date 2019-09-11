import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { ExampleService } from '../../services/example.service';
import { JinjaService } from '../../services/jinja.service';

import { JinjaRequest } from '../../models/jinja_request.interface'
import { JinjaResult } from '../../models/jinja_results.interface';

@Component({
  selector: 'jo-home-dashboard',
  template: `
  <div
    *ngIf="initialRequest$ | async as request; else loading"
    class="container"
    >
    <div class="row values-template">
      <div class="panel">
        <h3 class="panel-title">JSON</h3>
        <textarea class="editor" [(ngModel)]="request.json"></textarea>
      </div>
      <div class="panel">
        <h3 class="panel-title">Template</h3>
        <textarea class="editor" [(ngModel)]="request.template"></textarea>
      </div>
      <div class="panel">
        <h3 class="panel-title">Output</h3>
        <div class="output">
          <ng-container *ngIf="output$ | async as output; else loading">
            <pre *ngIf="output.error"
              class="error"
              >{{ output.error }}</pre>
            <pre *ngIf="output.result"
              >{{ output.result }}</pre>
          </ng-container>
        </div>
      </div>
    </div>
    <div class="row actions">
      <button
        (click)="process(request)"
        [disabled]="disableRun"
        class="action"
        >
        Run
      </button>
      <button
        (click)="clear(request)"
        [disabled]="disableRun"
        class="action"
        >
        Clear
      </button>
    </div>
  </div>
  <ng-template #loading>
    <div class="container">
      <div class="loading">
        <div class="loading-text">Loading...</div>
      </div>
    </div>
  </ng-template>
  `,
  styleUrls: ['./home_dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {
  
  public json: string;
  public template: string;
  public initialRequest$: Observable<JinjaRequest>;
  public output$: Observable<String>;
  public isError: boolean;
  public disableRun = false;
  
  constructor(
    private exampleService: ExampleService,
    private jinjaService: JinjaService
  ) {};
  
  ngOnInit(): void {
        
    this.initialRequest$ = this.exampleService.get().pipe(
      tap((request) => this.process(request))
    );
    
  }
  
  public process(request: JinjaRequest): void {
    
    this.output$ = of(true).pipe(
      tap(() => {
        this.isError = false;
        this.disableRun = true;
      }),
      switchMap(() => this.jinjaService.process(request)),
      tap(() => {
        this.disableRun = false;
      }),
      catchError(result => {
        this.disableRun = false;
        return of(result);
      })
    );
    
  }
  
  public clear(request: JinjaRequest): void {
    
    request.json = '';
    request.template = '';
    
    this.process(request);
    
  }
  
}
