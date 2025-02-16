import { Button } from '@/components/ui/button';
import { File, FileText, Image, MoreVertical, Paperclip, User } from 'lucide-react';

const categories = [
	{ name: 'all', icon: Paperclip },
	{ name: 'insurance', icon: FileText },
	{ name: 'claims', icon: File },
	{ name: 'vehicle', icon: Image },
	{ name: 'sacco', icon: User },
	{ name: 'other', icon: MoreVertical },
];

export function CategoryFilter({
	activeCategory,
	setActiveCategory,
}: { activeCategory: string; setActiveCategory: (category: string) => void }) {
	return (
		<>
			<div className="w-full h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-2" />
			<div className="flex overflow-x-auto py-2 px-4 space-x-2">
				{categories.map((category) => (
					<Button
						key={category.name}
						variant={activeCategory === category.name ? 'default' : 'outline'}
						size="sm"
						onClick={() => setActiveCategory(category.name)}
						className={`flex items-center space-x-1 whitespace-nowrap transform transition-all duration-200 hover:scale-105 ${
							activeCategory === category.name
								? 'bg-gradient-to-r from-yellow-400 to-red-500 text-white'
								: 'hover:bg-gray-100'
						}`}
					>
						<category.icon
							className={`w-5 h-5 ${activeCategory === category.name ? 'text-white' : 'text-gray-600'}`}
						/>
						<span className="capitalize font-medium">{category.name}</span>
					</Button>
				))}
			</div>
		</>
	);
}
