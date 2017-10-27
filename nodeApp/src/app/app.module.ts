import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ApiExplorerComponent } from './api-explorer/api-explorer.component';
import { InfoComponent } from './info/info.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProgrammingInfoComponent } from './programming-info/programming-info.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    ApiExplorerComponent,
    ProgrammingInfoComponent,
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	NgbModule.forRoot(),
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
