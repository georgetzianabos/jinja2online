import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="header row">
        <div class="grow"></div>
        <div class="grow">
          <h1 class="header-title">
            Jinja2online
          </h1>
        </div>
        <div class="links grow column center">
          <a class="row end link" href="https://github.com/georgetzianabos/jinja2online" target="_blank">
            <svg width="24" height="24" viewBox="0 0 24 24"><use class="icon" href="#github"></use></svg>
          </a>
        </div>
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor() {};
  
}
