import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Directory, ExpFile } from './explorer-data-types';

@Injectable()
export class ExplorerService {

  constructor(private http: HttpClient) { }

  //This takes a file name string, and returns a directory listing.
  async getDirectory( src: string ): Promise<Directory> {
	return new Promise<Directory>(resolve => {
		let _dir: Directory = new Directory;
		_dir.paths = [];
		let _data: any;
		this.http.get('assets/' + src).subscribe(data => {
			_data = data;
			for (let _path of _data.paths) {
				_dir.paths.push(_path.path);
			}
			resolve(_dir);
		});
	});
  }

  //This takes a directory listing, and returns an array of files
  async getFiles( _dir: Directory ): Promise<ExpFile[]> {
	return new Promise<ExpFile[]>(resolve => {
		let filesFetched: number = 0;
		let filesRequested: number = _dir.paths.length;
		let _files: ExpFile[] = [];
		let _data: any;
		for( let path of _dir.paths ) {
			this.http.get('assets/' + path).subscribe(data => {
				_data = data;
				_files.push(_data);
				filesFetched++;
				if(filesFetched == filesRequested)
				{
					resolve(_files);
				}
			});
		}
	});
  }

}
