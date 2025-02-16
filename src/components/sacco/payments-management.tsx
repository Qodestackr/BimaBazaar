'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, CreditCard, Plus } from 'lucide-react';
import { useState } from 'react';

interface TransactionItem {
	id: string;
	type: 'income' | 'expense';
	amount: number;
	description: string;
	date: string;
}

const TRANSACTIONS: TransactionItem[] = [
	{ id: '1', type: 'income', amount: 5000, description: 'Fleet payment', date: '2024-05-20' },
	{ id: '2', type: 'expense', amount: 2000, description: 'Insurance premium', date: '2024-05-18' },
	{ id: '3', type: 'income', amount: 3000, description: 'SACCO contribution', date: '2024-05-15' },
];

export function PaymentsManagement() {
	const [transactions] = useState<TransactionItem[]>(TRANSACTIONS);

	const totalBalance = transactions.reduce(
		(acc, transaction) =>
			transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount,
		0,
	);

	return (
		<div className="w-full my-10 max-w-md mx-auto bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-sm backdrop-blur-xl">
			<div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
				<div>
					<p className="text-xs text-zinc-600 dark:text-zinc-400">Total Balance</p>
					<h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
						KSh {totalBalance.toLocaleString()}
					</h1>
				</div>
				<Button size="sm" className="bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
					<Plus className="w-4 h-4 mr-2" />
					New Transaction
				</Button>
			</div>

			<div className="p-3">
				<h2 className="text-xs font-medium text-zinc-900 dark:text-zinc-100 mb-2">
					Recent Transactions
				</h2>
				<div className="space-y-2">
					{transactions.map((transaction) => (
						<div
							key={transaction.id}
							className={cn(
								'group flex items-center justify-between',
								'p-2 rounded-lg',
								'hover:bg-zinc-100 dark:hover:bg-zinc-800/50',
								'transition-all duration-200',
							)}
						>
							<div className="flex items-center gap-2">
								<div
									className={cn('p-1.5 rounded-lg', {
										'bg-green-100 dark:bg-green-900/30': transaction.type === 'income',
										'bg-red-100 dark:bg-red-900/30': transaction.type === 'expense',
									})}
								>
									{transaction.type === 'income' ? (
										<ArrowUpRight className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
									) : (
										<ArrowDownLeft className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
									)}
								</div>
								<div>
									<h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
										{transaction.description}
									</h3>
									<p className="text-[11px] text-zinc-600 dark:text-zinc-400">{transaction.date}</p>
								</div>
							</div>
							<div className="text-right">
								<span
									className={cn('text-xs font-medium', {
										'text-green-600 dark:text-green-400': transaction.type === 'income',
										'text-red-600 dark:text-red-400': transaction.type === 'expense',
									})}
								>
									{transaction.type === 'income' ? '+' : '-'} KSh{' '}
									{transaction.amount.toLocaleString()}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
				<div className="grid grid-cols-3 gap-2">
					<Button variant="outline" size="sm" className="text-xs">
						<ArrowUpRight className="w-3.5 h-3.5 mr-1" />
						Send
					</Button>
					<Button variant="outline" size="sm" className="text-xs">
						<ArrowDownLeft className="w-3.5 h-3.5 mr-1" />
						Receive
					</Button>
					<Button variant="outline" size="sm" className="text-xs">
						<CreditCard className="w-3.5 h-3.5 mr-1" />
						Pay Bills
					</Button>
				</div>
			</div>
		</div>
	);
}
