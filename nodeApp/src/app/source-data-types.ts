export class IndexElement {
	name: string = 'placeholder';
	path: string = 'path';
	subElements: IndexElement[];
	expandable: boolean = false;
	expanded: boolean = false;
}

export class Index {
	indexElements: IndexElement[];
	debugString: string = 'buggy';
}

export class DataElement {
	name: string;
	body: string;
}

export class Data {
	name: string;
	entries: DataElement[];
}