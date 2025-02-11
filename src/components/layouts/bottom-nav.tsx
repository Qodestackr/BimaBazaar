'use client';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { motion } from 'framer-motion';
import { Home, Search, User } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BottomNavProps {
	currentSection: string;
	setCurrentSection: (section: string) => void;
}

export function BottomNav({ currentSection, setCurrentSection }: BottomNavProps) {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const isMobile = useMediaQuery('(max-width: 640px)');

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
			setLastScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY]);

	if (!isMobile) return null;

	return (
		isVisible && (
			<motion.nav
				className="fixed bottom-0 left-0 right-0 border-t border-gray-200 px-6 py-2"
				initial={{ y: 100 }}
				animate={{ y: 0 }}
				transition={{ delay: 0.5 }}
			>
				<ul className="flex justify-around">
					{['home', 'search', 'profile'].map((section) => (
						<li key={section}>
							<Button
								onClick={() => setCurrentSection(section)}
								className={`p-2 rounded-full ${
									currentSection === section
										? 'bg-primary text-primary-foreground'
										: 'text-gray-400'
								}`}
							>
								{section === 'home' && <Home size={24} />}
								{section === 'search' && <Search size={24} />}
								{section === 'profile' && <User size={24} />}
							</Button>
						</li>
					))}
				</ul>
			</motion.nav>
		)
	);
}
