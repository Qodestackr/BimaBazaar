'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from 'lucide-react';
import { useState } from 'react';

interface LoanHistoryItem {
	id: string;
	date: string;
	amount: number;
	status: 'active' | 'paid' | 'defaulted';
	remainingBalance: number;
}

const mockLoanHistory: LoanHistoryItem[] = [
	{ id: 'loan1', date: '2024-01-15', amount: 100000, status: 'active', remainingBalance: 75000 },
	{ id: 'loan2', date: '2023-07-01', amount: 50000, status: 'paid', remainingBalance: 0 },
	{ id: 'loan3', date: '2023-03-10', amount: 75000, status: 'paid', remainingBalance: 0 },
	{ id: 'loan4', date: '2022-11-20', amount: 30000, status: 'defaulted', remainingBalance: 10000 },
];

export function LoanHistory() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full">
					<Calendar className="w-4 h-4 mr-2" />
					View Loan History
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle>Loan History</DialogTitle>
				</DialogHeader>
				<ScrollArea className="h-[400px] rounded-md border p-4">
					<table className="w-full">
						<thead>
							<tr className="text-left text-xs font-medium text-muted-foreground">
								<th className="p-2">Date</th>
								<th className="p-2">Amount</th>
								<th className="p-2">Status</th>
								<th className="p-2">Remaining Balance</th>
							</tr>
						</thead>
						<tbody>
							{mockLoanHistory.map((loan) => (
								<tr key={loan.id} className="border-t">
									<td className="p-2 text-sm">{loan.date}</td>
									<td className="p-2 text-sm">KSh {loan.amount.toLocaleString()}</td>
									<td className="p-2 text-sm capitalize">{loan.status}</td>
									<td className="p-2 text-sm">KSh {loan.remainingBalance.toLocaleString()}</td>
								</tr>
							))}
						</tbody>
					</table>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
