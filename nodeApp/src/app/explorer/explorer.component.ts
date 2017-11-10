import { Component, OnInit, ApplicationRef, Input, Output, ViewChild } from '@angular/core';
import { ExplorerService } from '../explorer.service';
import { FileCreatorService } from '../file-creator.service';
import { Directory, ExpFile, Section, Entry } from '../explorer-data-types';
import { Index, IndexElement, Data, DataElement } from '../source-data-types';
import { ExplorerEntryComponent } from '../explorer-entry/explorer-entry.component';

@Component({
selector: 'app-explorer',
templateUrl: './explorer.component.html',
styleUrls: ['./explorer.component.css'],
providers: [ExplorerService,
	FileCreatorService
	]
})
export class ExplorerComponent implements OnInit {
	@ViewChild('selectedFile') selectedFileEl;
	@Input() tocSrc: string;
headerFileString: string = "";
directory: Directory;
files: ExpFile[] = [];
index: Index = new Index;
displayTopic: string;
displayFileName: string;
displaySection: string;
displayData: Entry[] = [];
selectedTopic: number = 0;
selectedSection: number = 0;
editing: boolean = false;

	constructor( 
	private explorerService: ExplorerService,
	private fileCreatorService: FileCreatorService,
	private applicationRef: ApplicationRef,
	){}

	async ngOnInit() {
		this.directory = await this.explorerService.getDirectory(this.tocSrc);
		//console.log(this.directory);

		this.files = await this.explorerService.getFiles(this.directory);
		console.log(this.files);
		
		this.buildIndex();
		
		this.buildBody(this.index.indexElements[0].subElements[0]);
		//console.log(this.index);

		//this.explorerService.getFiles(this.directory).then(_directory =>
		//{
		//	console.log(_directory);
		//});
	}

	buildIndex(){
		this.index.indexElements = [];
		let _topicRef: number = 0;
		for( let _file of this.files ) { //get files from the file array for 'topic' level
			let _sectionRef: number = 0;
			let _topicElement: IndexElement = new IndexElement;
			_topicElement.name = _file.topic;
			_topicElement.topicRef = _topicRef;
			_topicElement.sectionRef = 0;
			if( _file.sections.length > 0 ){ //If file has more than 1 section
				_topicElement.subElements = []; //Create subElements
				_topicElement.expandable = true;
				for( let _section of _file.sections ) {
					let _sectionElement: IndexElement = new IndexElement; //create new section
					_sectionElement.name = _section.section;
					_sectionElement.topicRef = _topicRef;
					_sectionElement.sectionRef = _sectionRef;
					if( _section.entries.length > 0 ){ //If file has more than 1 entry
						_sectionElement.subElements = []; //Create subElements
						_sectionElement.expandable = true;
						let _entryRef: number = 0;
						for( let _entry of _section.entries ) {
							let _entryElement: IndexElement = new IndexElement; //create new entry
							_entryElement.name = _entry.entry;
							_entryElement.topicRef = _topicRef;
							_entryElement.sectionRef = _sectionRef;
							_entryElement.entryRef = _entryRef;
							_sectionElement.subElements.push(_entryElement); //push entry to section
							_entryRef++;
						}
					}
					_topicElement.subElements.push(_sectionElement); //push sections to topic
					_sectionRef++;
				}
				this.index.indexElements.push(_topicElement); //push topic to index
			}
			_topicRef++;
		}
	}

	expand( inputElement: IndexElement ){
		if( inputElement.expandable ) inputElement.expanded = true;
		this.applicationRef.tick();
	}

	contract( inputElement: IndexElement ){
		inputElement.expanded = false;
		this.applicationRef.tick();
	}
	
	twist( inputElement: IndexElement ){
		if( inputElement.expanded ){
			this.contract( inputElement );
		} else {
			this.expand( inputElement );
		}
		this.fileCreatorService.debug();
	}
	
	createNewFile(){
		//Build new index
		let _topicElement: IndexElement = new IndexElement; //create new section
		_topicElement.name = "New Topic";
		_topicElement.topicRef = this.files.length;
		_topicElement.sectionRef = 0;
		_topicElement.subElements = [];
		_topicElement.expandable = true;
		_topicElement.expanded = true;
		this.index.indexElements.push(_topicElement);
		//Create file
		let _file: ExpFile = new ExpFile;
		_file.name = "newname.json";
		_file.topic = "New Topic";
		_file.sections = [];
		this.files.push(_file);
		this.createNewSection(_topicElement);
		console.log(this.index);

	}

	createNewSection( inputElement: IndexElement ){
		//Build new index
		let _sectionElement: IndexElement = new IndexElement; //create new section
		_sectionElement.name = "New Section";
		_sectionElement.topicRef = inputElement.topicRef;
		_sectionElement.subElements = [];
		let _newSectionRef: number = inputElement.subElements.push(_sectionElement); //push sections to topic
		_newSectionRef--;
		inputElement.subElements[_newSectionRef].sectionRef = _newSectionRef;
		//expand files to include new entry
		let _fileSection = new Section;
		_fileSection.section = "New Section";
		_fileSection.entries = [];
		this.files[inputElement.topicRef].sections.push(_fileSection);
		this.createNewEntry( inputElement.subElements[inputElement.subElements.length - 1] );
		//open twisty
		this.expand( inputElement );
	}
	
	createNewEntry( inputElement: IndexElement ){
		//Build new index
		let _entryElement: IndexElement = new IndexElement; //create new entry
		_entryElement.name = "New Entry";
		_entryElement.expandable = false;
		_entryElement.expanded = false;
		inputElement.subElements.push(_entryElement); //push entry to section
		inputElement.expandable = true;
		inputElement.expanded = true;
		//expand files to include new entry
		let _fileEntry = new Entry;
		_fileEntry.entry = "New Entry";
		_fileEntry.data = [];
		_fileEntry.data.push("New Data");
		this.files[inputElement.topicRef].sections[inputElement.sectionRef].entries.push(_fileEntry);
		//open twisty
		this.buildBody( inputElement );
		this.expand( inputElement );
	}

	deleteFile( inputElement: IndexElement ){
//		console.log("section ref: %d",inputElement.sectionRef);
//		console.log("topic ref: %d",inputElement.topicRef);
		this.files.splice(inputElement.topicRef, 1);
//		console.log(this.files);
		this.buildIndex();
		if(inputElement.topicRef > this.files.length - 1) inputElement.topicRef = this.files.length - 1;
		this.buildBody( inputElement );
	}

	deleteSection( inputElement: IndexElement ){
//		console.log("section ref: %d",inputElement.sectionRef);
//		console.log("topic ref: %d",inputElement.topicRef);
		this.files[inputElement.topicRef].sections.splice(inputElement.sectionRef, 1);
//		console.log(this.files);
		this.buildIndex();
		if(inputElement.sectionRef > this.files[inputElement.topicRef].sections.length - 1) inputElement.sectionRef = this.files[inputElement.topicRef].sections.length - 1;
		this.buildBody( inputElement );
	}

	deleteEntry( inputElement: IndexElement ){
//		console.log(inputElement);
//		console.log("section ref: %d",inputElement.sectionRef);
//		console.log("topic ref: %d",inputElement.topicRef);
//		console.log("entry ref: %d",inputElement.entryRef);
		this.files[inputElement.topicRef].sections[inputElement.sectionRef].entries.splice(inputElement.entryRef, 1);
//		console.log(this.files);
		this.buildIndex();
		if(inputElement.entryRef > this.files[inputElement.topicRef].sections[inputElement.sectionRef].entries.length - 1) inputElement.entryRef = this.files[inputElement.topicRef].sections[inputElement.sectionRef].entries.length - 1;
		this.buildBody( inputElement );
	}
	
	buildBody( inputElement: IndexElement ) {
		this.displayData = [];
		let _displayEntry: Entry;
		//access the correct _data stuff
		this.selectedTopic = inputElement.topicRef;
		this.selectedSection = inputElement.sectionRef;
		for( let _item of this.files[inputElement.topicRef].sections[inputElement.sectionRef].entries ){
			_displayEntry = new Entry;
			_displayEntry.data = [];
			for( let _line of _item.data )
			{
				_displayEntry.data.push( _line );
			}
			_displayEntry.entry = _item.entry;
			this.displayData.push(_displayEntry);
		}
		this.displayTopic = this.files[inputElement.topicRef].topic;
		this.displayFileName = this.files[inputElement.topicRef].name;
		this.displaySection = this.files[inputElement.topicRef].sections[inputElement.sectionRef].section;
		this.applicationRef.tick();
	}
	
	showEdit() {
		this.editing = true;
		this.applicationRef.tick();
	}

	showView() {
		this.editing = false;
		this.files[this.selectedTopic].topic = this.displayTopic;
		this.files[this.selectedTopic].name = this.displayFileName;
		this.files[this.selectedTopic].sections[this.selectedSection].section = this.displaySection;
		this.files[this.selectedTopic].sections[this.selectedSection].entries = [];
		this.files[this.selectedTopic].sections[this.selectedSection].entries = this.displayData;
		this.buildIndex();
		this.applicationRef.tick();
	}

	downloadFile( inputElement: IndexElement ){
		this.showView();
		var blob = new Blob([JSON.stringify(this.files[inputElement.topicRef])], { type: 'text/plain' });
		var url= window.URL.createObjectURL(blob);
		var wOR = window.open(url);
		setTimeout(function(){
			window.URL.revokeObjectURL(url);  
		}, 2000);  
	}
	parseHeaderFile() {
		this.files.push(this.fileCreatorService.createFileFromHeader(this.headerFileString));
		this.buildIndex();
		this.applicationRef.tick();	  
	}

}
