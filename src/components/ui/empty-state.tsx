import { BoxIcon } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface EmptyStateProps {
	/** Title for the empty state */
	title: string;
	/** Description providing additional context */
	description: string;
	/** Primary CTA button text */
	actionText?: string;
	/** Primary CTA button link */
	actionHref?: string;
	/** Optional secondary action */
	secondaryAction?: ReactNode;
	/** Custom icon or disable icon by passing `null` */
	icon?: ReactNode | null;
	/** Custom class names for styling */
	className?: string;
}

/**
 * A flexible EmptyState component for handling empty UI states in a structured way.
 * Supports customizable icons, primary/secondary actions, and responsive design.
 *
 * Example Usage:
 * ```tsx
 * <EmptyState
 *   title="No Policies Found"
 *   description="Looks like you haven't added any policies yet."
 *   actionText="Add Policy"
 *   actionHref="/policies/new"
 *   secondaryAction={<Button variant="outline">Learn More</Button>}
 *   icon={<ShieldX className="w-10 h-10 text-gray-500" />}
 * />
 * ```
 */
export default function EmptyState({
	title,
	description,
	actionText,
	actionHref,
	secondaryAction,
	icon = <BoxIcon className="w-10 h-10 text-gray-500" />,
	className = '',
}: EmptyStateProps) {
	return (
		<div className={`flex flex-col items-center text-center py-6 space-y-3 ${className}`}>
			{icon !== null && <div>{icon}</div>}
			<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
			<p className="text-sm text-muted-foreground max-w-md">{description}</p>
			<div className="flex space-x-2">
				{actionHref && actionText && (
					<Link
						href={actionHref}
						className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2"
					>
						{actionText}
					</Link>
				)}
				{secondaryAction && secondaryAction}
			</div>
		</div>
	);
}
