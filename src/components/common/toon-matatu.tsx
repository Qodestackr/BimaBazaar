'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * 🚐 ToonMatatu - A lively, toonified Matatu animation! 🚀
 *
 * 🎨 **Features:**
 * - 🚖 **Idle Engine Vibration** → Tiny shakes to mimic a matatu idling at a stage.
 * - 🎢 **Suspension Sway** → Gentle left-right roll for realism.
 * - 🔆 **Dynamic Shadows** → Fake depth with animated drop shadows.
 * - 🏀 **Natural Bounce** → Smooth, non-robotic motion with easing.
 * - 👆 **Hover Interaction** → Slight tilt and scale-up on hover for playfulness.
 *  feels like it’s alive, waiting to be insured as it idles. 🏎️🔥
 */
export function ToonMatatu() {
	return (
		<motion.div
			className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
			animate={{
				y: [0, -3, 0], // Subtle bounce
				rotate: [-1.5, 1.5, -1.5], // Slight body roll
				x: [-0.5, 0.5, -0.5], // Simulates slight lateral shake
				transition: { duration: 0.3, ease: 'easeOut' },
			}}
			transition={{
				duration: 0.4,
				repeat: Number.POSITIVE_INFINITY,
				ease: 'easeInOut',
			}}
			whileHover={{
				scale: 1.1,
				rotate: [0, -2, 2, 0], // Slight tilt when hovered
				transition: { duration: 0.3, ease: 'easeOut' },
			}}
		>
			<motion.div
				className="drop-shadow-lg"
				animate={{
					filter: [
						'drop-shadow(0px 3px 2px rgba(0,0,0,0.3))',
						'drop-shadow(0px 4px 3px rgba(0,0,0,0.4))',
						'drop-shadow(0px 3px 2px rgba(0,0,0,0.3))',
					],
				}}
				transition={{
					duration: 0.4,
					repeat: Number.POSITIVE_INFINITY,
					ease: 'easeInOut',
				}}
			>
				<Image src="/colorful-matatu.jpg" alt="Toonified Matatu" width={80} height={40} />
			</motion.div>
		</motion.div>
	);
}
