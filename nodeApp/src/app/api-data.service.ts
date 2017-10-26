import { Injectable } from '@angular/core';
import { Index, IndexElement, fakeIndex, DataBody, fakeDataBody } from './api-data';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiDataService {
  indexData: any;
  bodyData: any[] = [];
  currentIndex: Index = new Index;
  constructor(private http: HttpClient) { }
  getIndex(): Index {
	this.getFullData();
    return this.currentIndex;
  }

  getDataBody(): DataBody {
	return fakeDataBody;
  }
  
  getFullData(): void {
	let tempPointer: number = 0;
	let tempFilePointer: number = 0;
	//Clear index
	this.currentIndex.indexElements = [];
    // Make the HTTP request:
    console.log("Getting json data for index.");
    this.http.get('assets/indexTemplate.json').subscribe(data => {
    // Read the result field from the JSON response.
    this.indexData = data;
	console.log(this.indexData);
	//Now get each contained filename.
	for (let file of this.indexData.files) {
		console.log("Getting json data for:");
		console.log(file.path);
		this.http.get('assets/' + file.path).subscribe(data => {
			tempFilePointer = this.bodyData.push(data) - 1;
			//Build index for viewer
			tempPointer = this.currentIndex.indexElements.push({ name: this.bodyData[tempFilePointer].name, subElements: [], expandable: false }) - 1;
			for (let entry of this.bodyData[tempFilePointer].entries) {
				this.currentIndex.indexElements[tempPointer].subElements.push({ name: entry.name, subElements: [], expandable: false });
				this.currentIndex.indexElements[tempPointer].expandable = true;
			}
			});
		}
	this.currentIndex.debugString = 'processed';
	console.log(this.bodyData);
    });
  }
}
