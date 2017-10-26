import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { Index, IndexElement, DataBody } from '../api-data';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: [
  './api.component.css',
  ],
  providers: [ApiDataService]
})
export class ApiComponent implements OnInit {
  _index: Index;
  _dataBody: DataBody;
  constructor( private apiDataService: ApiDataService ) {
  }

  ngOnInit() {
	  this._index = this.apiDataService.getIndex();
	  this._dataBody = this.apiDataService.getDataBody();
	  console.log("ApiComponent ngOnInit() has run.");
  }

}
