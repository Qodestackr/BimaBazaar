'use client';

import { AddDocumentDialog } from '@/components/documents/add-document-dialog';
import { CategoryFilter } from '@/components/documents/category-filter';
import { DocumentCard } from '@/components/documents/document-card';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/ui/empty-state';
import { Input } from '@/components/ui/input';
import { useDocuments } from '@/hooks/use-document';
import type { Document } from '@/types/document';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function DocumentsPage() {
	const [activeCategory, setActiveCategory] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSearchVisible, setIsSearchVisible] = useState(false);

	const { documents, isLoading, error } = useDocuments();

	const filteredDocuments = useCallback(
		() =>
			documents.filter(
				(doc: Document) =>
					(activeCategory === 'all' || doc.category === activeCategory) &&
					doc.name.toLowerCase().includes(searchTerm.toLowerCase()),
			),
		[documents, activeCategory, searchTerm],
	);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="max-w-2xl mx-auto mt-5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen">
			<header className="sticky top-0 bg-white dark:bg-gray-800 z-10 shadow-md">
				<div className="flex items-center justify-between p-4">
					<h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
						My Documents
					</h1>
					<div className="flex items-center space-x-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsSearchVisible(!isSearchVisible)}
						>
							<Search className="w-5 h-5" />
						</Button>
						<AddDocumentDialog />
					</div>
				</div>
				<AnimatePresence>
					{isSearchVisible && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className="px-4 pb-4"
						>
							<Input
								type="search"
								placeholder="Search documents..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full"
							/>
						</motion.div>
					)}
				</AnimatePresence>
				<CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
			</header>

			<main className="p-4 space-y-4">
				<AnimatePresence>
					{filteredDocuments().map((doc: Document, index: number) => (
						<DocumentCard key={doc.id} document={doc} index={index} />
					))}
				</AnimatePresence>

				{filteredDocuments().length === 0 && (
					<EmptyState
						title="No documents found"
						description={
							searchTerm
								? "Try adjusting your search or filters to find what you're looking for."
								: 'Start building your matatu insurance portfolio by adding your first document.'
						}
						actionText="Add Your First Document"
						actionHref="#"
						icon={<Plus className="w-6 h-6 text-gray-500" />}
					/>
				)}
			</main>

			<footer className="fixed bottom-4 left-4">
				<Button variant="outline" size="icon" className="rounded-full shadow-lg">
					<ArrowLeft className="w-4 h-4" />
				</Button>
			</footer>
		</div>
	);
}
