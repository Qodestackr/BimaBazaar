'use client';

import { BottomNav } from '@/components/layouts/bottom-nav';
import { HeroSection } from '@/components/layouts/hero-section';
// import { FeatureCards } from "@/components/feature-cards"
import { QuickQuote } from '@/components/quotes/quick-quote';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
	const [currentSection, setCurrentSection] = useState('home');

	return (
		<div>
			<main className="pb-12">
				{' '}
				{/* padding to account for bottom nav */}
				<AnimatePresence mode="wait">
					{currentSection === 'home' && (
						<motion.div
							key="home"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<HeroSection />
							{/* <FeatureCards /> */}
							<QuickQuote />
						</motion.div>
					)}
					{currentSection === 'search' && <SearchSection />}
					{currentSection === 'profile' && <ProfileSection />}
				</AnimatePresence>
			</main>

			<BottomNav currentSection={currentSection} setCurrentSection={setCurrentSection} />
		</div>
	);
}

function SearchSection() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="p-4"
		>
			<h2 className="text-xl font-semibold mb-4">Search Policies</h2>
			{/* Add search functionality here */}
		</motion.div>
	);
}

function ProfileSection() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="p-4"
		>
			<h2 className="text-xl font-semibold mb-4">Your Profile</h2>
			{/* Add profile information here */}
		</motion.div>
	);
}
