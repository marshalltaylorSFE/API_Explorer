import { Injectable } from '@angular/core';
import { Index, IndexElement, Data, DataElement } from './source-data-types';
import { DataBody } from './explorer-data-types';
import { fakeIndex, fakeData, fakeDataArray } from './api-data';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiDataService {
  constructor(private http: HttpClient) { }
  
  async getIndex(): Promise<Index> {
	return new Promise<Index>(resolve => {
		let tempIndex: Index = new Index;
		tempIndex.indexElements = [];
		let resIndex: any;
		let tempIndexElement: IndexElement;
//  	  console.log("Getting json for index.");
		this.http.get('assets/indexTemplate.json').subscribe(data => {
			resIndex = data;
			for (let file of resIndex.files) {
				tempIndexElement = new IndexElement;
				tempIndexElement.name = file.name;
				tempIndexElement.path = file.path;
				tempIndex.indexElements.push(tempIndexElement);
//				console.log(file);
			}
			resolve(tempIndex);
		});
		tempIndex.debugString = 'Debuggy';
	});
  }

  async getData( reqIndex: Index ): Promise<Data[]> {
	return new Promise<Data[]>(resolve => {
			let filesFetched: number = 0;
			let filesRequested: number = 0;
			let tempData: Data;
			let tempDataArray: Data[] = [];
			let resData: any;
			console.log("Getting json for data from index");
			console.log(reqIndex);
			//debugger;
			//Iterate through the passed index
			for (let file of reqIndex.indexElements) {
				filesRequested++;
				console.log(file);
				//debugger;
				this.http.get('assets/' + file.path).subscribe(data => {
					resData = data;
					tempData = new Data;
					tempData.name = resData.name;
					tempData.entries = [];
					for( let entry of resData.entries ){
						tempData.entries.push(entry);
					};
					//debugger;
					filesFetched++;
					tempDataArray.push(tempData);
					console.log(tempDataArray);
					if(filesFetched == filesRequested)
					{
						console.log(tempDataArray);
						resolve(tempDataArray);
					}
				});
			}
	});
  }
}
