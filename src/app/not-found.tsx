import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-600 to-black-600 p-4">
			<div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
				<div className="p-6 sm:p-8">
					<div className="flex justify-center mb-6">
						<div className="relative">
							<div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
								<AlertTriangle className="w-16 h-16 text-yellow-500" />
							</div>
							<div className="absolute -bottom-2 -right-2 bg-red-500 rounded-full p-2">
								<MapPin className="w-6 h-6 text-white" />
							</div>
						</div>
					</div>
					<h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Off Route!</h1>
					<p className="text-center text-gray-600 mb-6">
						Oops! Looks like we took a wrong turn. Don't worry, we'll get you back on track!
					</p>
					<div className="flex flex-col space-y-4">
						<Button asChild variant="default" className="w-full">
							<Link href="/">
								<RotateCcw className="mr-2 h-4 w-4" /> Back to the Depot
							</Link>
						</Button>
						<Button asChild variant="outline" className="w-full">
							<Link href="/contact">Report This Issue</Link>
						</Button>
					</div>
				</div>
				<div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
					<p className="text-center text-sm text-gray-600">
						Need help? Call our 24/7 Matatu Support:{' '}
						<a href="tel:+254123456789" className="font-medium text-yellow-600 hover:underline">
							+254 123 456 789
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
