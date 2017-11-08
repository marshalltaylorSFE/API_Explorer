import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Entry } from '../explorer-data-types';

@Component({
  selector: 'app-explorer-entry',
  templateUrl: './explorer-entry.component.html',
  styleUrls: ['./explorer-entry.component.css']
})
export class ExplorerEntryComponent implements OnInit, OnChanges {
  @Input() entry: Entry;
  @Input() editing: boolean = false;
  postString: string = "";

  constructor() {
  }

  ngOnInit() {
	  this.getBody();
  }

  ngOnChanges(changes: SimpleChanges) {
	if( changes.editing.firstChange == true ) {
		this.getBody(); //This forces update of entry
	}
	if( changes.editing.currentValue == true ) {
		this.getBody();
	} else {
		this.setBody();
	}
  }
  
  getBody() {
	  this.postString = "";
	  for( let line of this.entry.data ){
		  this.postString += line;
		  this.postString += "\n";
	  }
  }
  
  setBody() {
	  this.entry.data = this.postString.split("\n");
  }

}
