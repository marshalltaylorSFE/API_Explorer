export class IndexElement {
	name: string = 'placeholder';
	topicRef: number;
	sectionRef: number;
	subElements: IndexElement[];
	expandable: boolean = false;
	expanded: boolean = false;
}

export class Index {
	indexElements: IndexElement[];
}

export class DataElement {
	name: string;
	body: string[];
}

export class Data {
	name: string;
	entries: DataElement[];
}