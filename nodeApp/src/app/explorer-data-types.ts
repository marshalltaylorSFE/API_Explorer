//Types specific to the explorer component.
export class Directory {
	paths: string[];
}

export class Entry {
	entry: string;
	data: string[];
}

export class Section {
	section: string;
	entries: Entry[];
}

export class File {
	name: string;
	topic: string;
	sections: Section[];
}