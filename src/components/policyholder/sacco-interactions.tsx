'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ArrowUpRight,
	Briefcase,
	Calendar,
	CheckCircle,
	Loader2,
	PlusCircle,
	TrendingUp,
	Users,
	XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { LoanApplication } from '../loans/loan-application';
import { LoanHistory } from '../loans/loan-history';

interface SACCODetails {
	name: string;
	membershipNumber: string;
	joinDate: string;
	contributionAmount: number;
	lastContributionDate: string;
	totalSavings: number;
	targetSavings: number;
	availableLoanAmount: number;
}

interface SavingsTransaction {
	date: string;
	amount: number;
	type: 'contribution' | 'withdrawal' | 'interest';
	balance: number;
}

const saccoDetails: SACCODetails = {
	name: 'Matatu Owners SACCO',
	membershipNumber: 'MOS-12345',
	joinDate: '2022-01-15',
	contributionAmount: 5000,
	lastContributionDate: '2024-05-01',
	totalSavings: 150000,
	targetSavings: 500000,
	availableLoanAmount: 450000,
};

const savingsTransactions: SavingsTransaction[] = [
	{ date: '2024-05-01', amount: 5000, type: 'contribution', balance: 150000 },
	{ date: '2024-04-30', amount: 750, type: 'interest', balance: 145000 },
	{ date: '2024-04-01', amount: 5000, type: 'contribution', balance: 144250 },
	{ date: '2024-03-15', amount: 10000, type: 'withdrawal', balance: 139250 },
	{ date: '2024-03-01', amount: 5000, type: 'contribution', balance: 149250 },
];

export function SACCOInteractions() {
	const [activeTab, setActiveTab] = useState('overview');
	const [isLoading, setIsLoading] = useState(false);
	const [contributionAmount, setContributionAmount] = useState(saccoDetails.contributionAmount);
	const [loanAmount, setLoanAmount] = useState(100000);
	const [loanTerm, setLoanTerm] = useState(12);
	const [loanApprovalChance, setLoanApprovalChance] = useState(90);
	const savingsProgress = (saccoDetails.totalSavings / saccoDetails.targetSavings) * 100;

	const handleContribution = async () => {
		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));
		saccoDetails.totalSavings += contributionAmount;
		saccoDetails.lastContributionDate = new Date().toISOString().split('T')[0];
		setIsLoading(false);
	};

	const calculateLoanApproval = () => {
		const maxLoan = saccoDetails.totalSavings * 3;
		const approvalChance = Math.min(100, (saccoDetails.totalSavings / loanAmount) * 100);
		setLoanApprovalChance(approvalChance);
	};

	const aiSavingsInsight = () => {
		const monthlyAverage =
			savingsTransactions.reduce(
				(sum, transaction) =>
					transaction.type === 'contribution' ? sum + transaction.amount : sum,
				0,
			) /
			(savingsTransactions.length / 2);

		const timeToGoal = (saccoDetails.targetSavings - saccoDetails.totalSavings) / monthlyAverage;

		return `Based on your average monthly contribution of KSh ${monthlyAverage.toFixed(2)}, 
    you're projected to reach your savings goal in approximately ${timeToGoal.toFixed(1)} months. 
    Consider increasing your monthly contribution to reach your goal faster.`;
	};

	return (
		<Card className="w-full overflow-hidden">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg font-semibold flex items-center justify-between">
					<span className="flex items-center">
						<Users className="w-5 h-5 mr-2" />
						SACCO Membership
					</span>
					<span className="text-sm font-normal">{saccoDetails.membershipNumber}</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="savings">Savings</TabsTrigger>
						<TabsTrigger value="loans">Loans</TabsTrigger>
					</TabsList>
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2 }}
						>
							<TabsContent value="overview" className="p-4 space-y-4">
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">SACCO Name</span>
										<span className="font-medium">{saccoDetails.name}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">Join Date</span>
										<span className="font-medium">{saccoDetails.joinDate}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">Monthly Contribution</span>
										<span className="font-medium">
											KSh {saccoDetails.contributionAmount.toLocaleString()}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">Last Contribution</span>
										<span className="font-medium">{saccoDetails.lastContributionDate}</span>
									</div>
								</div>
								<Dialog>
									<DialogTrigger asChild>
										<Button className="w-full">
											<PlusCircle className="w-4 h-4 mr-2" />
											Make Contribution
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Make a Contribution</DialogTitle>
											<DialogDescription>
												Enter the amount you'd like to contribute to your SACCO savings.
											</DialogDescription>
										</DialogHeader>
										<div className="space-y-4 py-4">
											<div className="space-y-2">
												<Label htmlFor="amount">Contribution Amount (KSh)</Label>
												<Input
													id="amount"
													type="number"
													value={contributionAmount}
													onChange={(e) => setContributionAmount(Number(e.target.value))}
													min={1000}
													step={1000}
												/>
											</div>
											<Button onClick={handleContribution} className="w-full" disabled={isLoading}>
												{isLoading ? (
													<>
														<Loader2 className="w-4 h-4 mr-2 animate-spin" />
														Processing...
													</>
												) : (
													'Confirm Contribution'
												)}
											</Button>
										</div>
									</DialogContent>
								</Dialog>
							</TabsContent>
							<TabsContent value="savings" className="p-4 space-y-4">
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<span className="text-sm font-medium">Total Savings</span>
										<span className="text-lg font-bold">
											KSh {saccoDetails.totalSavings.toLocaleString()}
										</span>
									</div>
									<div className="space-y-1">
										<div className="flex justify-between text-sm">
											<span className="text-muted-foreground">Savings Goal</span>
											<span>{savingsProgress.toFixed(0)}%</span>
										</div>
										<Progress value={savingsProgress} className="h-2" />
										<div className="flex justify-between text-xs text-muted-foreground">
											<span>KSh {saccoDetails.totalSavings.toLocaleString()}</span>
											<span>KSh {saccoDetails.targetSavings.toLocaleString()}</span>
										</div>
									</div>
								</div>
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="outline" className="w-full">
											<Briefcase className="w-4 h-4 mr-2" />
											View Detailed Statement
										</Button>
									</DialogTrigger>
									<DialogContent className="max-w-3xl">
										<DialogHeader>
											<DialogTitle>Savings Statement</DialogTitle>
											<DialogDescription>
												Your recent savings transactions and AI-powered insights.
											</DialogDescription>
										</DialogHeader>
										<ScrollArea className="h-[300px] rounded-md border p-4">
											<table className="w-full">
												<thead>
													<tr className="text-left text-xs font-medium text-muted-foreground">
														<th className="p-2">Date</th>
														<th className="p-2">Type</th>
														<th className="p-2 text-right">Amount</th>
														<th className="p-2 text-right">Balance</th>
													</tr>
												</thead>
												<tbody>
													{savingsTransactions.map((transaction, index) => (
														<tr key={`${index}-${transaction.type}`} className="border-t">
															<td className="p-2 text-sm">{transaction.date}</td>
															<td className="p-2 text-sm capitalize">{transaction.type}</td>
															<td className="p-2 text-sm text-right">
																{transaction.type === 'withdrawal' ? '-' : '+'}
																KSh {transaction.amount.toLocaleString()}
															</td>
															<td className="p-2 text-sm text-right">
																KSh {transaction.balance.toLocaleString()}
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</ScrollArea>
										<div className="mt-2 p-3 bg-muted rounded-md">
											{/* Richer Texts to stand out... */}
											<h4 className="font-semibold mb-2">Savings Insight</h4>
											<p className="text-sm text-muted-foreground">{aiSavingsInsight()}</p>
										</div>
									</DialogContent>
								</Dialog>
							</TabsContent>
							<TabsContent value="loans" className="p-4 space-y-4">
								<div className="bg-muted p-3 rounded-lg">
									<div className="flex justify-between items-center mb-2">
										<span className="text-sm font-medium">Available Loan Amount</span>
										<ArrowUpRight className="w-4 h-4 text-green-500" />
									</div>
									<span className="text-2xl font-bold">
										KSh {saccoDetails.availableLoanAmount.toLocaleString()}
									</span>
								</div>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="loan-amount">Loan Amount (KSh)</Label>
										<Input
											id="loan-amount"
											type="number"
											value={loanAmount}
											onChange={(e) => {
												setLoanAmount(Number(e.target.value));
												calculateLoanApproval();
											}}
											min={10000}
											max={saccoDetails.availableLoanAmount}
											step={10000}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="loan-term">Loan Term (Months)</Label>
										<Slider
											id="loan-term"
											min={3}
											max={36}
											step={3}
											value={[loanTerm]}
											onValueChange={(value) => setLoanTerm(value[0])}
										/>
										<div className="flex justify-between text-xs text-muted-foreground">
											<span>3 months</span>
											<span>{loanTerm} months</span>
											<span>36 months</span>
										</div>
									</div>
									<div className="p-3 bg-muted rounded-lg">
										<div className="flex justify-between items-center mb-2">
											<span className="text-sm font-medium">AI Approval Estimate</span>
											{loanApprovalChance >= 70 ? (
												<CheckCircle className="w-4 h-4 text-green-500" />
											) : (
												<XCircle className="w-4 h-4 text-red-500" />
											)}
										</div>
										<Progress value={loanApprovalChance} className="h-2 mb-2" />
										<span className="text-sm text-muted-foreground">
											{loanApprovalChance.toFixed(0)}% chance of approval
										</span>
									</div>
									{loanApprovalChance > 70 && <LoanApplication availableLoanAmount={10000} />}
								</div>
								<LoanHistory />
							</TabsContent>
						</motion.div>
					</AnimatePresence>
				</Tabs>
			</CardContent>
		</Card>
	);
}
