import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { File, FileText, Image, Plus, Search } from 'lucide-react';

export function AddDocumentDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="icon" variant="ghost">
					<Plus className="w-5 h-5" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white p-2 rounded-t-lg">
					<DialogTitle className="text-xl">Add New Matatu Document</DialogTitle>
				</DialogHeader>
				<div className="grid grid-cols-2 gap-2 p-2 bg-gray-100">
					{[
						{ icon: FileText, text: 'Take Photo', gradient: 'from-green-400 to-blue-500' },
						{ icon: Image, text: 'Choose from Gallery', gradient: 'from-pink-500 to-yellow-500' },
						{ icon: File, text: 'Upload File', gradient: 'from-purple-400 to-red-500' },
						{ icon: Search, text: 'Scan Document', gradient: 'from-yellow-300 to-red-500' },
					].map(({ icon: Icon, text, gradient }) => (
						<Button
							key={text}
							className={`flex flex-col items-center justify-center h-28 bg-gradient-to-br ${gradient} hover:opacity-90 text-white transform transition-transform duration-200 hover:scale-105 shadow-lg`}
						>
							<Icon className="w-10 h-10 mb-2" />
							<span className="font-semibold">{text}</span>
						</Button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
