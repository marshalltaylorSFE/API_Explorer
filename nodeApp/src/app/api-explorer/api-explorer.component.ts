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

  async ngOnInit() {
	//By example, this should seem to work:
//	this.apiDataService.getIndex().then(retIndex => {
//		//debugger;
//		this._index = retIndex;
//		console.log(this._index);
//	});

	//But it doesn't pause the code, this seems to work better
	this._index = await this.apiDataService.getIndex();
	console.log(this._index);

	this.apiDataService.getData(this._index).then(retData =>
	{
		this._data = retData;
		this.loaded = true;
		console.log(this._index);
		console.log(this._data);
		//Build the rest of the index
		for (let indexThing of this._index.indexElements) {
			console.log(indexThing);
			for (let file of this._data) {
				if (indexThing.path == file.name)
				{
					console.log( 'match, expanding' );
					indexThing.expandable = true;
					indexThing.subElements = [];
					for (let fileThing of file.entries){
						let tempElement: IndexElement = new IndexElement;
						tempElement.name = fileThing.name;
						indexThing.subElements.push(tempElement);
					}
				}
			};
		};
	});
	console.log("ApiExplorerComponent ngOnInit() has run.");
  }
  

}