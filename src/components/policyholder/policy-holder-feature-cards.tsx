'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Car, CreditCard, FileText, HelpCircle, Shield, Users } from 'lucide-react';
import Link from 'next/link';

interface FeatureCard {
	title: string;
	description: string;
	icon: React.ElementType;
	href: string;
	color: string;
}

const featureCards: FeatureCard[] = [
	{
		title: 'My Vehicle',
		description: 'View and manage your vehicle details',
		icon: Car,
		href: '/dashboard/policyholder/vehicle',
		color: 'bg-blue-500',
	},
	{
		title: 'Insurance',
		description: 'Check your policy and file claims',
		icon: Shield,
		href: '/dashboard/policyholder/insurance',
		color: 'bg-green-500',
	},
	{
		title: 'Payments',
		description: 'View transactions and make payments',
		icon: CreditCard,
		href: '/dashboard/policyholder/payments',
		color: 'bg-purple-500',
	},
	{
		title: 'SACCO',
		description: 'Access SACCO services and information',
		icon: Users,
		href: '/dashboard/policyholder/sacco',
		color: 'bg-yellow-500',
	},
	{
		title: 'Documents',
		description: 'Access and upload important documents',
		icon: FileText,
		href: '/dashboard/policyholder/documents',
		color: 'bg-red-500',
	},
	{
		title: 'Support',
		description: 'Get help and contact customer service',
		icon: HelpCircle,
		href: '/dashboard/policyholder/support',
		color: 'bg-indigo-500',
	},
];

export function PolicyHolderFeatureCards() {
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
			{featureCards.map((card) => (
				<Link key={card.title} href={card.href} className="group">
					<motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="h-full">
						<Card className="h-full p-3 hover:bg-muted/50 transition-colors">
							<div className="flex flex-col items-start gap-2 h-full">
								<div className={`p-2 rounded-lg ${card.color}`}>
									<card.icon className="w-5 h-5 text-white" />
								</div>

								<div className="space-y-1 flex-1">
									<h3 className="font-medium text-sm leading-tight">{card.title}</h3>
									<p className="text-xs text-muted-foreground line-clamp-2">{card.description}</p>
								</div>

								<span className="text-xs text-primary font-medium mt-1 group-hover:underline">
									View →
								</span>
							</div>
						</Card>
					</motion.div>
				</Link>
			))}
		</div>
	);
}
