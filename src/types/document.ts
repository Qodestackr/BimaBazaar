export interface Document {
	id: string;
	name: string;
	type: 'pdf' | 'image' | 'other';
	category: 'insurance' | 'claims' | 'vehicle' | 'sacco' | 'other';
	dateAdded: Date;
	size: number;
	addedBy: string;
	description: string;
}
