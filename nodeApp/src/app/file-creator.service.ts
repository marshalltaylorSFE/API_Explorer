import { Injectable } from '@angular/core';
import { Directory, ExpFile, Section, Entry } from './explorer-data-types';

@Injectable()
export class FileCreatorService {

	constructor() { }

	debug() {
		console.log("Weeee!");
	}

	createFileFromHeader( _data: string ): ExpFile {
		let _loopCounterA: number;
		let _loopCounterB: number;
		let _loopCounterC: number;
		let _loopCounterD: number;
		let _file: ExpFile = new ExpFile;
		_file.name = "newname.json";
		_file.topic = "New Topic";
		_file.sections = [];
		
		let _fileSection: Section;
		let _fileEntry: Entry;

		let _indexL: number = 0;
		let _indexR: number = 0;
		let _refIndex1: number = 0;
		let _refIndex2: number = 0;
		//Remove block comments
		_loopCounterA = 0;
		_indexL = _data.indexOf("/*");
		while(( _indexL != -1 )&&(_loopCounterA < 1000))
		{
			_indexR = _data.indexOf("*/", _indexL);
			if(_indexR != -1){
				_data = _data.slice(0, _indexL) + _data.slice(_indexR + 2);
			}
			_indexL = _data.indexOf("/*");
			_loopCounterA++;
		}
		console.log("block comment loop counts: %d", _loopCounterA);
		//Remove line comments
		_loopCounterA = 0;
		_indexL = _data.indexOf("//");
		while(( _indexL != -1 )&&(_loopCounterA < 1000))
		{
			_indexR = _data.indexOf("\n", _indexL);
			if(_indexR != -1){
				_data = _data.slice(0, _indexL) + _data.slice(_indexR + 1);
			}
			_indexL = _data.indexOf("//");
			_loopCounterA++;
		}
		console.log("line comment loop counts: %d", _loopCounterA);
		
		//Look for class
		//Create array of class strings
		let _classStrs: string[] = [];
		_loopCounterA = 0;
		while(( _data.length > 0 )&&(_loopCounterA < 100))
		{
			_refIndex1 = _data.indexOf("class");
			if( _refIndex1 != -1 ) {
				//Found.  Find the next onerror
				_refIndex2 = _data.indexOf("class", _refIndex1 + 1);
				if( _refIndex2 != -1 ) {
					//Another has been found
					_classStrs.push(_data.slice(_refIndex1, _refIndex2)); //save text[class ... ]class
					_data = _data.slice(_refIndex2); //remove [text class ... ]class
				}
				else
				{
					//not found, push rest of file
					_classStrs.push(_data.slice(_refIndex1)); //save text[class ... EOF]
					_data = "";
				}
			}
			else
			{
				//no classes found!
				_data = "";
			}
			_loopCounterA++;
		}
		console.log("Found %d classes!", _classStrs.length);
		console.log(_classStrs);
		
		//For each class
		for( let _classStr of _classStrs ){
			_fileSection = new Section;
			_fileSection.section = "Default Name";
			_fileSection.entries = [];
			//Get the first line
			_refIndex1 = _classStr.indexOf("\n"); //look for space after class name
			let _firstLine: string = _classStr.slice(0, _refIndex1);			
			_classStr = _classStr.slice(_refIndex1 + 1); //remove first line

			//Get class name
			_refIndex1 = _firstLine.indexOf(" ", 6); //look for space after class name
			let _className: string = _firstLine.slice(6, _refIndex1);
			console.log(_className);
			_fileSection.section = _className;
			
			_fileEntry = new Entry;
			_fileEntry.entry = "Class Overview";
			_fileEntry.data = [];
			
			_fileEntry.data.push("<h3>First line</h3>");
			_fileEntry.data.push("<p>"+_firstLine+"</p>");
			
			//Get inheritance
			_refIndex1 = _firstLine.indexOf(":", 6); //look for space after class name
			if(_refIndex1 != -1 )
			{
				let _classInh: string = _firstLine.slice(_refIndex1 + 1);
				//Chop off leading spaces
				while((_classInh[0]==" ")||(_classInh[0]=="\t"))_classInh = _classInh.slice(1);
				console.log(_classInh);

				_fileEntry.data.push("<h3>Inheritance</h3>");
				_fileEntry.data.push("<p>"+_classInh+"</p>");
			}
			
			_fileSection.entries.push(_fileEntry); //put the entry in the section
			
			//Get each public function now-----------------------------------------
			
			//make an array of lines in the source
			let _srcLines: string[] = [];
			_loopCounterA = 0;
			while(( _classStr.length > 0 )&&(_loopCounterA < 500))
			{
				//look for return
				_refIndex1 = _classStr.indexOf("\n"); //look for space after class name
				if(_refIndex1 != -1)
				{
					_srcLines.push(_classStr.slice(0, _refIndex1)); //save line
					_classStr = _classStr.slice(_refIndex1 + 1);//remove line from classStr
				}
				else
				{
					_srcLines.push(_classStr); //save line
					_classStr = "";
				}
				_loopCounterA++;
			}
			console.log("Source function list has %d lines.", _srcLines.length);
			
			//Copy into new array of good lines
			let _public: boolean = false;
			let _dstLines: string[] = [];
			for( let line of _srcLines )
			{
				if( line.toUpperCase().indexOf("PUBLIC") != -1 ) _public = true;
				if( line.toUpperCase().indexOf("PRIVATE") != -1 ) _public = false;
				if( line.toUpperCase().indexOf("PROTECTED") != -1 ) _public = false;
				if( _public )
				{
					if( line.indexOf("(") != -1 ) //is public and is function
					{
						_dstLines.push(line);
					}
				}
			}
			console.log("Destination function list has %d lines.", _dstLines.length);
			
			//Create entries for each line
			for( let line of _dstLines )
			{
				_fileEntry = new Entry;
				_fileEntry.entry = "Some Function";
				_fileEntry.data = [];

				//Remove all tabs
				line = line.replace("\t", "");
				//Chop off leading spaces
				while(line[0]==" ") line = line.slice(1);
				//Look for the (
				_refIndex2 = line.indexOf("("); //look for space after class name
				//Remove white space before it
				while(line[_refIndex2 - 1]==" ")
				{
					line = line.slice(0, _refIndex2 - 1)+line.slice(_refIndex2);
					_refIndex2--;
				}
				//Seek out function name
				_refIndex1 = 0;
				while(line.slice(_refIndex1,_refIndex2).indexOf(" ") != -1)
				{
					_refIndex1++;
				}
				//refIndex1 now points to start of class name
				let _className = line.slice(_refIndex1,_refIndex2);
				let _returnType: string = line.slice(0,_refIndex1);
				//Remove white space at end
				let _paring: boolean = true;
				while(_paring&&_returnType)
				{
					let _len: number = _returnType.length;
					if(_len < 1)
					{
						_paring = false;
					}
					else
					{
						if( _returnType[_len-1]==" ")
						{
							_returnType = _returnType.slice(0, _len-1);
						}
						else
						{
							_paring = false;
						}
					}
				}
				//Get the parameters
				let _paramStr: string;
				let _params: string[] = [];
				_refIndex1 = _refIndex2;
				_refIndex2 = line.indexOf(")");
				if(_refIndex2 != -1)
				{
					_paramStr = line.slice(_refIndex1 + 1, _refIndex2);
					//_refIndex1 = line.indexOf("("); //look for space after class name
					_loopCounterA = 0;
					while(( _paramStr.length > 0 )&&(_loopCounterA < 100))
					{
						//look for comma
						_refIndex1 = _paramStr.indexOf(","); //look for space after class name
						if(_refIndex1 != -1)
						{
							_params.push(_paramStr.slice(0, _refIndex1)); //save line
							_paramStr = _paramStr.slice(_refIndex1 + 1);//remove line from classStr
						}
						else
						{
							_params.push(_paramStr); //save line
							_paramStr = "";
						}
						_loopCounterA++;
					}
				}
				let _cleanParams: string[] = []
				//Clean the params
				for( let _p of _params )
				{
					//Chop off leading spaces
					while(_p[0]==" ") _p = _p.slice(1);					
					//Remove white space at end
					let _paring: boolean = true;
					while(_paring&&_p)
					{
						let _len: number = _p.length;
						if(_len < 1)
						{
							_paring = false;
						}
						else
						{
							if( _p[_len-1]==" ")
							{
								_p = _p.slice(0, _len-1);
							}
							else
							{
								_paring = false;
							}
						}
					}
					_cleanParams.push(_p);
				}
				console.log(_cleanParams);
			
				_fileEntry.entry = "."+_className+"(...)";
				_fileEntry.data.push("<h3>Full Function Definition</h3>");
				_fileEntry.data.push("<pre>"+line+"</pre>");
				_fileEntry.data.push("<h3>Parameters</h3>");
				_fileEntry.data.push("<ul>");
				for( let item of _cleanParams )
				{
				_fileEntry.data.push("<li>");
					_fileEntry.data.push("<i>"+item+"</i> -- Description");
				_fileEntry.data.push("</li>");
				}
				_fileEntry.data.push("</ul>");
				_fileEntry.data.push("<h3>Return</h3>");
				_fileEntry.data.push("<ul>");
				_fileEntry.data.push("<li>");
				_fileEntry.data.push("<i>"+_returnType+"</i>");
				_fileEntry.data.push("</li>");
				_fileEntry.data.push("</ul>");
				_fileSection.entries.push(_fileEntry); //put the entry in the section
				console.log("     "+line);
			}
			_file.sections.push(_fileSection); //put the section in the file
		}
		return _file;
	}
}
