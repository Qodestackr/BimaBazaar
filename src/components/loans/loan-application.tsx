'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { CheckCircle, TrendingUp, XCircle } from 'lucide-react';
import { useState } from 'react';

interface LoanApplicationProps {
	availableLoanAmount: number;
}

export function LoanApplication({ availableLoanAmount }: LoanApplicationProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [loanAmount, setLoanAmount] = useState(100000);
	const [loanTerm, setLoanTerm] = useState(12);
	const [loanApprovalChance, setLoanApprovalChance] = useState(0);

	const calculateLoanApproval = () => {
		const approvalChance = Math.min(100, (availableLoanAmount / loanAmount) * 100);
		setLoanApprovalChance(approvalChance);
	};

	const handleLoanAmountChange = (value: number) => {
		setLoanAmount(value);
		calculateLoanApproval();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle loan application submission
		console.log('Loan application submitted:', { loanAmount, loanTerm });
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="w-full">
					<TrendingUp className="w-4 h-4 mr-2" />
					Apply for Loan
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Apply for a Loan</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="loan-amount">Loan Amount (KSh)</Label>
						<Input
							id="loan-amount"
							type="number"
							value={loanAmount}
							onChange={(e) => handleLoanAmountChange(Number(e.target.value))}
							min={10000}
							max={availableLoanAmount}
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
					<Button type="submit" className="w-full" disabled={loanApprovalChance < 70}>
						Submit Loan Application
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
