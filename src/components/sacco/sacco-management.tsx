'use client';

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
import { Briefcase, Search, TrendingUp, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

interface SACCOMember {
	id: string;
	name: string;
	role: string;
	contribution: number;
	joinDate: string;
}

const MEMBERS: SACCOMember[] = [
	{ id: '1', name: 'John Doe', role: 'Driver', contribution: 5000, joinDate: '2023-01-15' },
	{ id: '2', name: 'Jane Smith', role: 'Owner', contribution: 10000, joinDate: '2022-11-30' },
	{ id: '3', name: 'Bob Johnson', role: 'Driver', contribution: 4500, joinDate: '2023-03-20' },
];

export function SACCOManagement() {
	const [members, setMembers] = useState<SACCOMember[]>(MEMBERS);
	const [searchTerm, setSearchTerm] = useState('');
	const [roleFilter, setRoleFilter] = useState('all');

	const filteredMembers = members.filter((member) => {
		return (
			member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(roleFilter === 'all' || member.role === roleFilter)
		);
	});

	const totalContributions = members.reduce((acc, member) => acc + member.contribution, 0);

	return (
		<div className="w-full bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-sm backdrop-blur-xl">
			<div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<p className="text-sm text-zinc-600 dark:text-zinc-400">Total Members</p>
					<h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
						{members.length}
					</h1>
				</div>
				<Button size="sm" className="bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
					<UserPlus className="w-4 h-4 mr-2" />
					Add Member
				</Button>
			</div>

			<div className="p-4">
				<div className="flex flex-col sm:flex-row gap-4 mb-4">
					<div className="relative flex-grow">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
						<Input
							type="search"
							placeholder="Search members..."
							className="pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<Select value={roleFilter} onValueChange={setRoleFilter}>
						<SelectTrigger className="w-full sm:w-[180px]">
							<SelectValue placeholder="Filter by role" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Roles</SelectItem>
							<SelectItem value="Driver">Driver</SelectItem>
							<SelectItem value="Owner">Owner</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Contribution</TableHead>
								<TableHead>Join Date</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredMembers.map((member) => (
								<TableRow key={member.id}>
									<TableCell className="font-medium">{member.name}</TableCell>
									<TableCell>{member.role}</TableCell>
									<TableCell>KSh {member.contribution.toLocaleString()}</TableCell>
									<TableCell>{member.joinDate}</TableCell>
									<TableCell>
										<Button variant="ghost" size="sm">
											<Users className="w-4 h-4 mr-2" />
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
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-2">
						<p className="text-sm text-zinc-600 dark:text-zinc-400">Total Contributions</p>
						<p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
							KSh {totalContributions.toLocaleString()}
						</p>
					</div>
					<Button variant="outline" size="sm" className="text-xs">
						<Briefcase className="w-3.5 h-3.5 mr-1" />
						Manage Funds
					</Button>
					<Button variant="outline" size="sm" className="text-xs">
						<TrendingUp className="w-3.5 h-3.5 mr-1" />
						View Reports
					</Button>
				</div>
			</div>
		</div>
	);
}
