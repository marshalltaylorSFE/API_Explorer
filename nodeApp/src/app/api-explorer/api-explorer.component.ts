import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { Index, IndexElement, Data, DataElement } from '../source-data-types';
import { DataBody } from '../explorer-data-types';

@Component({
  selector: 'app-api-explorer',
  //template: 'Hello World',
  templateUrl: './api-explorer.component.html',
  styleUrls: ['./api-explorer.component.css'],
  providers: [ApiDataService]
})
export class ApiExplorerComponent implements OnInit {
  _index: Index;
  _data: Data[];
  loaded: boolean = false;
  constructor( private apiDataService: ApiDataService ) {
  }

  ngOnInit() {
	//this._index = this.apiDataService.getIndex();
	//this.apiDataService.getData(this.apiDataService.getIndex());
	this.apiDataService.getIndex().then(retIndex => {
		this._index = retIndex;
		this.apiDataService.getData(retIndex).then(retData => {
			this._data = retData;
			});
		this.loaded = true;
	});
	//this._dataBody = this.apiDataService.getDataBody();
	console.log("ApiExplorerComponent ngOnInit() has run.");
  }
}
