import { Injectable } from '@angular/core';
import { Index, IndexElement, Data, DataElement } from './source-data-types';
import { DataBody } from './explorer-data-types';
import { fakeIndex, fakeData, fakeDataArray } from './api-data';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiDataService {
  constructor(private http: HttpClient) { }
  
  getIndex(): Promise<Index> {
	let tempIndex: Index = new Index;
	tempIndex.indexElements = [];
	let resIndex: any;
	let tempIndexElement: IndexElement;
    console.log("Getting json for index.");
    this.http.get('assets/indexTemplate.json').subscribe(data => {
		resIndex = data;
		for (let file of resIndex.files) {
			tempIndexElement = new IndexElement;
			tempIndexElement.name = file.name;
			tempIndexElement.path = file.path;
			tempIndex.indexElements.push(tempIndexElement);
			console.log(file);
		}
		console.log(tempIndex);
	});
	tempIndex.debugString = 'Debuggy';
	return Promise.resolve(tempIndex);
  }

  getData( reqIndex: Index ): Promise<Data[]> {
	let tempData: Data;
	let tempDataArray: Data[] = [];
	let resData: any;
	
	console.log("Getting json for data from index");
    console.log(JSON.stringify(reqIndex));
	//debugger;
	//Iterate through the passed index
	for (let file of reqIndex.indexElements) {
		console.log(file);
		//debugger;
		this.http.get('assets/' + file.path).subscribe(data => {
			resData = data;
			tempData = new Data;
			tempData.entries = [];
			//tempData.name = resData.
			//debugger;
			
		});
	}
	return Promise.resolve(fakeDataArray);
  }
  
  querryData(): void {
//    this.http.get('assets/indexTemplate.json').subscribe(data => {
//		this.tempVar = data;
//		console.log(this.tempVar.files[0].name);
//	});
//	  
  }
//  getFullData(): void {
//	let tempPointer: number = 0;
//	let tempFilePointer: number = 0;
//	//Clear index
//	this.currentIndex.indexElements = [];
//    // Make the HTTP request:
//    console.log("Getting json data for index.");
//    this.http.get('assets/indexTemplate.json').subscribe(data => {
//    // Read the result field from the JSON response.
//    this.indexData = data;
//	console.log(this.indexData);
//	//Now get each contained filename.
//	for (let file of this.indexData.files) {
//		console.log("Getting json data for:");
//		console.log(file.path);
//		this.http.get('assets/' + file.path).subscribe(data => {
//			tempFilePointer = this.bodyData.push(data) - 1;
//			//Build index for viewer
//			tempPointer = this.currentIndex.indexElements.push({ name: this.bodyData[tempFilePointer].name, subElements: [], expandable: false }) - 1;
//			for (let entry of this.bodyData[tempFilePointer].entries) {
//				this.currentIndex.indexElements[tempPointer].subElements.push({ name: entry.name, subElements: [], expandable: false });
//				this.currentIndex.indexElements[tempPointer].expandable = true;
//			}
//			});
//		}
//	this.currentIndex.debugString = 'processed';
//	console.log(this.bodyData);
//    });
//  }
}
