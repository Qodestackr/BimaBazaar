import { Star } from 'lucide-react';
import type React from 'react';

interface RatingProps {
	/**
	 * A normalized rating between 0 and 1.
	 * For example, 0.8 will fill 80% of the stars.
	 */
	rating: number;
	/**
	 * Total number of stars to display.
	 * Defaults to 5.
	 */
	max?: number;
}

const Rating: React.FC<RatingProps> = ({ rating, max = 5 }) => {
	// Determine how many stars should be filled.
	const filledStars = Math.round(rating * max);
	// Create an array [1, 2, …, max] to represent each star.
	const stars = Array.from({ length: max }, (_, i) => i + 1);

	return (
		<div className="flex items-center mt-1">
			{stars.map((star) => (
				<Star
					key={star}
					className={`h-3 w-3 ${
						star <= filledStars ? 'text-yellow-400 fill-current' : 'text-gray-300'
					}`}
				/>
			))}
		</div>
	);
};

export default Rating;
