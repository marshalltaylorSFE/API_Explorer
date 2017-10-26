export class ApiData {
}

export class IndexElement {
	name: string = 'placeholder';
	subElements: IndexElement[];
	expandable: boolean = false;
}

export class Index {
	indexElements: IndexElement[];
	debugString: string = 'buggy';
}

export const fakeIndex: Index = {
	indexElements: [
		{ name: 'element 1', subElements: [], expandable: false },
		{ name: 'element 2', subElements: [], expandable: false },
		{ name: 'element 3', subElements: [
			{ name: 'element A', subElements: [], expandable: false },
			{ name: 'element B', subElements: [], expandable: false }
		], expandable: true },
		{ name: 'element 4', subElements: [], expandable: false }
	], 
	debugString: 'debuggy'
};

export class DataBody {
	entry: string[];
}

export const fakeDataBody: DataBody = {
	entry: [
	"This is the first information",
	"This is the second information"
	]
};