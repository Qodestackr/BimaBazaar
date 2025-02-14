'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { AnimatePresence, motion, useAnimation, useInView } from 'framer-motion';
import {
	ArrowLeft,
	ChevronDown,
	File,
	FileText,
	Image,
	MoreVertical,
	Paperclip,
	Plus,
	Search,
	User,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Document {
	id: string;
	name: string;
	type: 'pdf' | 'image' | 'other';
	category: 'insurance' | 'claims' | 'vehicle' | 'sacco' | 'other';
	dateAdded: Date;
	size: number;
	addedBy: string;
	description: string;
}

const documents: Document[] = [
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

const categories = [
	{ name: 'all', icon: Paperclip },
	{ name: 'insurance', icon: FileText },
	{ name: 'claims', icon: File },
	{ name: 'vehicle', icon: Image },
	{ name: 'sacco', icon: User },
	{ name: 'other', icon: MoreVertical },
];

export function DocumentsPage() {
	const [activeCategory, setActiveCategory] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [expandedDocId, setExpandedDocId] = useState<string | null>(null);
	const [isSearchVisible, setIsSearchVisible] = useState(false);

	const filteredDocuments = documents.filter(
		(doc) =>
			(activeCategory === 'all' || doc.category === activeCategory) &&
			doc.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const CategoryIcon = ({ name }: { name: string }) => {
		const category = categories.find((cat) => cat.name === name);
		return category ? <category.icon className="w-5 h-5" /> : null;
	};

	return (
		<div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen">
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
				<div className="flex overflow-x-auto py-2 px-4 space-x-2">
					{categories.map((category) => (
						<Button
							key={category.name}
							variant={activeCategory === category.name ? 'default' : 'outline'}
							size="sm"
							onClick={() => setActiveCategory(category.name)}
							className="flex items-center space-x-1 whitespace-nowrap"
						>
							<CategoryIcon name={category.name} />
							<span className="capitalize">{category.name}</span>
						</Button>
					))}
				</div>
			</header>

			<main className="p-4 space-y-4">
				<AnimatePresence>
					{filteredDocuments.map((doc, index) => (
						<DocumentCard key={doc.id} document={doc} index={index} />
					))}
				</AnimatePresence>

				{filteredDocuments.length === 0 && <EmptyState searchTerm={searchTerm} />}
			</main>

			<footer className="fixed bottom-4 left-4">
				<Button variant="outline" size="icon" className="rounded-full shadow-lg">
					<ArrowLeft className="w-4 h-4" />
				</Button>
			</footer>
		</div>
	);
}

function DocumentCard({ document, index }: { document: Document; index: number }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const controls = useAnimation();
	const ref = useRef(null);
	const inView = useInView(ref);

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={{
				visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
				hidden: { opacity: 0, y: 50 },
			}}
		>
			<Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
				<CardContent className="p-0">
					<motion.div className="p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								{document.type === 'pdf' ? (
									<FileText className="w-5 h-5 text-red-500" />
								) : document.type === 'image' ? (
									<Image className="w-5 h-5 text-blue-500" />
								) : (
									<File className="w-5 h-5 text-gray-500" />
								)}
								<div>
									<h3 className="font-medium text-lg">{document.name}</h3>
									<p className="text-sm text-muted-foreground">
										{format(document.dateAdded, 'MMM d, yyyy')} ·{' '}
										{(document.size / 1024 / 1024).toFixed(2)} MB
									</p>
								</div>
							</div>
							<ChevronDown
								className={cn('w-5 h-5 transition-transform', isExpanded && 'rotate-180')}
							/>
						</div>
					</motion.div>
					<AnimatePresence>
						{isExpanded && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3 }}
								className="px-4 pb-4 space-y-3"
							>
								<div className="text-sm text-muted-foreground">
									<p>{document.description}</p>
									<p className="mt-2">Added by: {document.addedBy}</p>
								</div>
								<div className="flex space-x-2">
									<Button size="sm" className="w-full">
										View
									</Button>
									<Button size="sm" variant="outline" className="w-full">
										Share
									</Button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</CardContent>
			</Card>
		</motion.div>
	);
}

function AddDocumentDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="icon" variant="ghost">
					<Plus className="w-5 h-5" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Document</DialogTitle>
					<DialogDescription>
						Choose how you want to add a new document to your matatu insurance portfolio.
					</DialogDescription>
				</DialogHeader>
				<div className="grid grid-cols-2 gap-4 py-4">
					<Button className="flex flex-col items-center justify-center h-24 bg-gradient-to-br from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white">
						<FileText className="w-8 h-8 mb-2" />
						Take Photo
					</Button>
					<Button className="flex flex-col items-center justify-center h-24 bg-gradient-to-br from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 text-white">
						<Image className="w-8 h-8 mb-2" />
						Choose from Gallery
					</Button>
					<Button className="flex flex-col items-center justify-center h-24 bg-gradient-to-br from-orange-500 to-red-400 hover:from-orange-600 hover:to-red-500 text-white">
						<File className="w-8 h-8 mb-2" />
						Upload File
					</Button>
					<Button className="flex flex-col items-center justify-center h-24 bg-gradient-to-br from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white">
						<Search className="w-8 h-8 mb-2" />
						Scan Document
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function EmptyState({ searchTerm }: { searchTerm: string }) {
	return (
		<div className="text-center py-12">
			<FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
			<h2 className="text-2xl font-semibold mb-2">No documents found</h2>
			<p className="text-muted-foreground max-w-md mx-auto">
				{searchTerm
					? "Try adjusting your search or filters to find what you're looking for."
					: 'Start building your matatu insurance portfolio by adding your first document.'}
			</p>
			<Button className="mt-4" variant="outline">
				<Plus className="w-4 h-4 mr-2" />
				Add Your First Document
			</Button>
		</div>
	);
}
