import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { ApiExplorerComponent } from './api-explorer/api-explorer.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { ExplorerEntryComponent } from './explorer-entry/explorer-entry.component';
import { InfoComponent } from './info/info.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProgrammingInfoComponent } from './programming-info/programming-info.component';

import { DomSanitizer } from '@angular/platform-browser'

@Pipe({ name: 'safeHtml'})

export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@NgModule({
  declarations: [
    AppComponent,
	ApiExplorerComponent,
    InfoComponent,
    ExplorerComponent,
	ExplorerEntryComponent,
    ProgrammingInfoComponent,
	SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	NgbModule.forRoot(),
	HttpClientModule,
	FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
