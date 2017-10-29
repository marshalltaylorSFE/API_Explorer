import { Component, OnInit, ApplicationRef } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { Index, IndexElement, Data, DataElement } from '../source-data-types';
import { DataBodyElement } from '../explorer-data-types';

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
  _dataBody: DataBodyElement[] = [];
  loaded: boolean = false;
  constructor( 
	private apiDataService: ApiDataService,
	private applicationRef: ApplicationRef
	){}

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
		this.buildBody('');
	});
	
	console.log("ApiExplorerComponent ngOnInit() has run.");
  }
  
  buildBody( inputPath: string ) {
	  let tempDBE: DataBodyElement;
	  //access the correct _data stuff
	  for( let files of this._data ){
		  if( files.name == inputPath ){
			this._dataBody = [];
			for( let entry of files.entries ){
				//console.log(entry);
				tempDBE = new DataBodyElement;
				tempDBE.entry = entry.body;
				this._dataBody.push(tempDBE);
			}
		  }
	  }
	  console.log(this._dataBody);
	  console.log("ApiExplorerComponent buildBody() has run.");
	  this.applicationRef.tick();
  }
  

}