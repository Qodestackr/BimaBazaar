'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Filter, Plus, Search, Shield } from 'lucide-react';
import { useState } from 'react';

interface PolicyItem {
	id: string;
	vehicleReg: string;
	type: string;
	status: 'active' | 'expiring' | 'expired';
	expiryDate: string;
}

const POLICIES: PolicyItem[] = [
	{
		id: '1',
		vehicleReg: 'KAA 123B',
		type: 'Comprehensive',
		status: 'active',
		expiryDate: '2024-12-31',
	},
	{
		id: '2',
		vehicleReg: 'KBB 456C',
		type: 'Third Party',
		status: 'expiring',
		expiryDate: '2024-06-30',
	},
	{
		id: '3',
		vehicleReg: 'KCC 789D',
		type: 'Comprehensive',
		status: 'expired',
		expiryDate: '2024-05-15',
	},
];

export function InsuranceManagement() {
	const [policies, setPolicies] = useState<PolicyItem[]>(POLICIES);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');

	const filteredPolicies = policies.filter((policy) => {
		return (
			policy.vehicleReg.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(statusFilter === 'all' || policy.status === statusFilter)
		);
	});

	return (
		<div className="w-full bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-sm backdrop-blur-xl">
			<div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<p className="text-sm text-zinc-600 dark:text-zinc-400">Total Policies</p>
					<h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
						{policies.length}
					</h1>
				</div>
				<Button size="sm" className="bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
					<Plus className="w-4 h-4 mr-2" />
					New Policy
				</Button>
			</div>

			<div className="p-4">
				<div className="flex flex-col sm:flex-row gap-4 mb-4">
					<div className="relative flex-grow">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
						<Input
							type="search"
							placeholder="Search policies..."
							className="pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="w-full sm:w-[180px]">
							<SelectValue placeholder="Filter by status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Statuses</SelectItem>
							<SelectItem value="active">Active</SelectItem>
							<SelectItem value="expiring">Expiring</SelectItem>
							<SelectItem value="expired">Expired</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Vehicle Reg</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Expiry Date</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredPolicies.map((policy) => (
								<TableRow key={policy.id}>
									<TableCell className="font-medium">{policy.vehicleReg}</TableCell>
									<TableCell>{policy.type}</TableCell>
									<TableCell>
										<Badge
										// variant={
										//     policy.status === "active" ? "success" :
										//         policy.status === "expiring" ? "warning" : "destructive"
										// }
										>
											{policy.status}
										</Badge>
									</TableCell>
									<TableCell>{policy.expiryDate}</TableCell>
									<TableCell>
										<Button variant="ghost" size="sm">
											<Shield className="w-4 h-4 mr-2" />
											Details
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>

			<div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
				<div className="grid grid-cols-3 gap-2">
					<Button variant="outline" size="sm" className="text-xs">
						<AlertCircle className="w-3.5 h-3.5 mr-1" />
						File Claim
					</Button>
					<Button variant="outline" size="sm" className="text-xs">
						<CheckCircle className="w-3.5 h-3.5 mr-1" />
						Renew Policy
					</Button>
					<Button variant="outline" size="sm" className="text-xs">
						View All
					</Button>
				</div>
			</div>
		</div>
	);
}
