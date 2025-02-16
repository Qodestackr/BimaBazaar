'use client';

import type { Document } from '@/types/document';
import { useEffect, useState } from 'react';

const mockDocuments: Document[] = [
	{
		id: '1',
		name: 'Insurance Policy',
		type: 'pdf',
		category: 'insurance',
		dateAdded: new Date('2024-01-15'),
		size: 1024000,
		addedBy: 'John Doe',
		description: 'Comprehensive coverage for your matatu',
	},
	{
		id: '2',
		name: 'Accident Claim Form',
		type: 'pdf',
		category: 'claims',
		dateAdded: new Date('2024-02-20'),
		size: 512000,
		addedBy: 'Jane Smith',
		description: 'Form for filing accident claims',
	},
	{
		id: '3',
		name: 'Vehicle Registration',
		type: 'image',
		category: 'vehicle',
		dateAdded: new Date('2024-03-10'),
		size: 2048000,
		addedBy: 'Mike Johnson',
		description: 'Official registration document for your matatu',
	},
	{
		id: '4',
		name: 'SACCO Membership',
		type: 'pdf',
		category: 'sacco',
		dateAdded: new Date('2024-04-05'),
		size: 768000,
		addedBy: 'Sarah Brown',
		description: 'Proof of SACCO membership and benefits',
	},
];

export function useDocuments() {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchDocuments = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setDocuments(mockDocuments);
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error('An error occurred while fetching documents'),
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDocuments();
	}, []);

	return { documents, isLoading, error };
}
