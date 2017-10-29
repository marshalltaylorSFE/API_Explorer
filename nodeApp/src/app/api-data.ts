import { Index, IndexElement, Data, DataElement } from './source-data-types';
//import { DataBody } from './explorer-data-types';

export const fakeIndex: Index = {
	indexElements: [
		{ name: 'element 1', path: 'path', subElements: [], expandable: false },
		{ name: 'element 2', path: 'path', subElements: [], expandable: false },
		{ name: 'element 3', path: 'path', subElements: [
			{ name: 'element A', path: 'path', subElements: [], expandable: false },
			{ name: 'element B', path: 'path', subElements: [], expandable: false }
		], expandable: true },
		{ name: 'element 4', path: 'path', subElements: [], expandable: false }
	], 
	debugString: 'debuggy'
};

export const fakeData: Data = {
	name: 'fake file name',
	entries: [
		{ name: 'fake entry 1', body: 'fake body 1'},
		{ name: 'fake entry 2', body: 'fake body 2'}
	]
};

export const fakeDataArray: Data[] = [
	fakeData,
	fakeData
]

//export const fakeDataBody: DataBody = {
//	entry: [
//	"This is the first information",
//	"This is the second information"
//	]
//};