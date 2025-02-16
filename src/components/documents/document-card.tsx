'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Document } from '@/types/document';
import { format } from 'date-fns';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ChevronDown, File, FileText, Image } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function DocumentCard({ document, index }: { document: Document; index: number }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const controls = useAnimation();
	const ref = useRef(null);
	const inView = useInView(ref);

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	const getDocumentIcon = () => {
		switch (document.type) {
			case 'pdf':
				return <FileText className="w-5 h-5 text-red-500" />;
			case 'image':
				return <Image className="w-5 h-5 text-blue-500" />;
			default:
				return <File className="w-5 h-5 text-gray-500" />;
		}
	};

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
					<motion.div
						className="p-4 cursor-pointer"
						onClick={() => setIsExpanded(!isExpanded)}
						whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
						whileTap={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								{getDocumentIcon()}
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
					<motion.div
						initial={false}
						animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
						transition={{ duration: 0.3 }}
						className="px-4 pb-4 space-y-3 overflow-hidden"
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
				</CardContent>
			</Card>
		</motion.div>
	);
}
