import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jinja2/jinja2';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { HomeDashboardComponent } from './containers/home_dashboard/home_dashboard.component';

import { ExampleService } from './services/example.service';
import { JinjaService } from './services/jinja.service';

const routes: Routes = [
  { path: '', component: HomeDashboardComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    HomeDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    CodemirrorModule
  ],
  providers: [
    ExampleService,
    JinjaService
  ]
})
export class HomeModule { }
