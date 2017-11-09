import { Injectable } from '@angular/core';
import { Directory, ExpFile, Section, Entry } from './explorer-data-types';

@Injectable()
export class FileCreatorService {

  constructor() { }
  
  debug() {
	  console.log("Weeee!");
  }

  createFileFromHeader( _data: string ): ExpFile {
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
	  _indexL = _data.indexOf("/*");
	  while( _indexL != -1 )
	  {
		  _indexR = _data.indexOf("*/", _indexL);
		  if(_indexR != -1){
			  _data = _data.slice(0, _indexL) + _data.slice(_indexR + 2);
		  }
		  _indexL = _data.indexOf("/*");
	  }
	  //Remove line comments
	  _indexL = _data.indexOf("//");
	  while( _indexL != -1 )
	  {
		  _indexR = _data.indexOf("\n", _indexL);
		  if(_indexR != -1){
			  _data = _data.slice(0, _indexL) + _data.slice(_indexR + 1);
		  }
		  _indexL = _data.indexOf("//");
	  }	  
	  //Look for class
	  _refIndex1 = _data.indexOf("class");
	  if( _refIndex1 != -1 ) {
		  _refIndex2 = _data.indexOf("\n",_refIndex1);
		  if( _refIndex2 > _refIndex1 ) {
			_indexL = _refIndex1 + 6;
			_indexR = _data.indexOf(" ", _indexL);
			console.log(_data.slice(_indexL, _indexR));
			console.log(_data.slice(_refIndex1, _refIndex2));
			_file.name = _data.slice(_indexL, _indexR) + ".json";
			_file.topic = _data.slice(_indexL, _indexR);
			_fileSection = new Section;
			_fileSection.section = "Overview";
			_fileSection.entries = [];
			_fileEntry = new Entry;
			_fileEntry.entry = "Class call";
			_fileEntry.data = [];
			_fileEntry.data.push(_data.slice(_refIndex1, _refIndex2));
			_fileSection.entries.push(_fileEntry);
			_file.sections.push(_fileSection);
			console.log(_file);
			}
	  }
	  //Look for public:
	  _fileSection = new Section;
	  _fileSection.section = "API";
	  _fileSection.entries = [];
	  let _publicIndexL: number = 0;
	  let _publicIndexR: number = 0;
	  let _lineIndexL: number = 0;
	  let _lineIndexR: number = 0;	  
	  let _paramsIndexL: number = 0;
	  let _paramsIndexR: number = 0;	  
	  _publicIndexL = _data.indexOf("public:", _refIndex2);
	  while( _publicIndexL != -1 )
	  {	  
		console.log("Found public section");
		//mark start of public section
		_indexL = _data.indexOf("\n", _publicIndexL) + 1;
		_publicIndexR = _data.indexOf("private:", _publicIndexL);
		if( _publicIndexR > _publicIndexL ) {
			console.log("Found private section");
			//mark end of public section
			_indexR = _publicIndexR;
			_publicIndexL = _data.indexOf("public:", _publicIndexR);
		}
		else
		{
			_indexR = _data.length;
			_publicIndexL = -1;
		}
		//Now look between _index
		//Identify single line
		_lineIndexL = _indexL;
		_lineIndexR = _indexR;
		while(_lineIndexL < _indexR)
		{
			_lineIndexR = _data.indexOf("\n", _lineIndexL) + 1;
			//look for function by finding ()
			_paramsIndexL = _data.indexOf("(", _lineIndexL);
			if((_paramsIndexL != -1)&&(_paramsIndexL < _lineIndexR))
			{
				//Get function name
				let _fnStr: string = _data.slice(_lineIndexL, _lineIndexR);
				_fnStr = _fnStr.replace(' ', '');
				_fnStr = _fnStr.replace("\n", '');
				_fnStr = _fnStr.slice(0, _fnStr.indexOf("("));
				_fileEntry = new Entry;
				_fileEntry.entry = _fnStr;
				_fileEntry.data = [];
				_fileEntry.data.push("<p>" + _data.slice(_lineIndexL, _lineIndexR) + "</p>");
				
				_paramsIndexR = _data.indexOf(")", _paramsIndexL) + 1;
				let _str = _data.slice(_paramsIndexL, _paramsIndexR);
				//remove ()
				_str = _str.replace('(', '');
				_str = _str.replace(')', '');

				if( _str.length < 1 )
				{
					console.log("No parameters");
					_fileEntry.data.push("No parameters");
				}
				else
				{
					_fileEntry.data.push("<h3>");
					_fileEntry.data.push("Parameters:");
					_fileEntry.data.push("</h3>");
					_fileEntry.data.push("<ul>");
					console.log(_str);
					while( _str.length > 1 )
					{
						let _param: string = "";
						_refIndex1 = _str.indexOf(",");
						if(_refIndex1 != -1){
							_param = _str.slice(0, _refIndex1);
							_str = _str.slice(_refIndex1 + 1, _str.length);
						}
						else{
							_param = _str;
							_str = "";
						}
						while(_param[0] === ' ')
						{
							_param = _param.slice(1);
						}
						console.log("   "+_param);
						_fileEntry.data.push("<li>");
						_fileEntry.data.push(_param);
						_fileEntry.data.push("</li>");

					}
					_fileEntry.data.push("</ul>");
				}
				_fileSection.entries.push(_fileEntry);
			}
			_lineIndexL = _lineIndexR;
		}
	  }
	  if(_fileSection) _file.sections.push(_fileSection);
	  console.log(_file);
	  return _file;
  }
}
