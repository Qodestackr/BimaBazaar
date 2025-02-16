import type { ReactNode } from 'react';

interface EmptyStateProps {
	title: string;
	description?: string;
	actionText?: string;
	actionHref?: string;
	icon: ReactNode;
}

export default function EmptyState({
	title,
	description,
	actionText,
	actionHref,
	icon,
}: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center p-4 space-y-2">
			{icon}
			<h2 className="text-lg font-medium text-muted-foreground">{title}</h2>
			{description && <p className="text-sm text-muted-foreground text-center">{description}</p>}
			{actionText && actionHref && (
				<a href={actionHref} className="text-primary font-medium hover:underline">
					{actionText}
				</a>
			)}
		</div>
	);
}
