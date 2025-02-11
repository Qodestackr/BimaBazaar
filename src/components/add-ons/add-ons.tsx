'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, PlusCircle } from 'lucide-react';
import { useState } from 'react';

interface AddOn {
	id: string;
	name: string;
	description: string;
	price: number;
}

const availableAddOns: AddOn[] = [
	{ id: 'addon1', name: 'Roadside Assistance', description: '24/7 help on the go', price: 500 },
	{
		id: 'addon2',
		name: 'Accident Forgiveness',
		description: 'Your first mishap is on us',
		price: 750,
	},
	{
		id: 'addon3',
		name: 'Personal Injury Cover',
		description: 'Extra safety for you and your loved ones',
		price: 1200,
	},
];

export function AddOns() {
	const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

	const toggleAddOn = (id: string) => {
		setSelectedAddOns((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		);
	};

	return (
		<div className="space-y-3">
			<div className="flex flex-col justify-center items-center">
				<h2 className="text-xl font-bold">Enhance Coverage</h2>
				<p className="text-xs text-muted-foreground">Choose extra add-ons for extra protection.</p>
			</div>

			<div className="grid grid-cols-1 gap-2">
				{availableAddOns.map((addon) => (
					<Card
						key={addon.id}
						className={`cursor-pointer transition-shadow p-1 flex flex-col justify-center items-center ${
							selectedAddOns.includes(addon.id)
								? 'border-2 border-primary shadow-lg'
								: 'border border-gray-200'
						}`}
						onClick={() => toggleAddOn(addon.id)}
					>
						<CardHeader className="flex items-center justify-between p-0">
							<CardTitle className="text-sm font-semibold">{addon.name}</CardTitle>
							{selectedAddOns.includes(addon.id) ? (
								<CheckCircle className="w-4 h-4 text-green-500" />
							) : (
								<PlusCircle className="w-4 h-4 text-gray-400" />
							)}
						</CardHeader>
						<CardContent className="p-0">
							<p className="text-xs text-muted-foreground">{addon.description}</p>
						</CardContent>
						<CardFooter className="p-0 mt-1">
							<p className="text-xs font-bold text-green-600">KSh {addon.price}</p>
						</CardFooter>
					</Card>
				))}
			</div>

			<div className="flex justify-center gap-4 items-center">
				<Button>Add Selected to Purchase</Button>
				<Button>Proceed Anyway</Button>
			</div>
		</div>
	);
}
