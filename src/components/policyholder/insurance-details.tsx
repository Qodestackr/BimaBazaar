'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
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
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
	Calendar,
	CheckCircle,
	ChevronDown,
	CreditCard,
	FileText,
	Shield,
	Umbrella,
	XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface InsuranceDetails {
	policyNumber: string;
	type: string;
	status: 'active' | 'expiring' | 'expired';
	startDate: string;
	endDate: string;
	coverageAmount: number;
	premiumPaid: number;
	premiumTotal: number;
	nextPaymentDate: string;
	nextPaymentAmount: number;
	vehicleDetails: {
		make: string;
		model: string;
		year: number;
		registrationNumber: string;
	};
}

const insuranceDetails: InsuranceDetails = {
	policyNumber: 'POL-12345',
	type: 'Comprehensive',
	status: 'active',
	startDate: '2024-01-01',
	endDate: '2024-12-31',
	coverageAmount: 1000000,
	premiumPaid: 75000,
	premiumTotal: 100000,
	nextPaymentDate: '2024-06-01',
	nextPaymentAmount: 25000,
	vehicleDetails: {
		make: 'Toyota',
		model: 'Hiace',
		year: 2022,
		registrationNumber: 'KAA 123B',
	},
};

const coverageOptions = [
	{ name: 'Third Party Liability', included: true },
	{ name: 'Collision Coverage', included: true },
	{ name: 'Comprehensive Coverage', included: true },
	{ name: 'Personal Injury Protection', included: true },
	{ name: 'Uninsured Motorist Coverage', included: false },
	{ name: 'Roadside Assistance', included: true },
	{ name: 'Rental Car Coverage', included: false },
];

export function InsuranceDetails() {
	const [activeTab, setActiveTab] = useState('overview');
	const [isLoading, setIsLoading] = useState(false);
	const [showPaymentAlert, setShowPaymentAlert] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState<
		'initiating' | 'processing' | 'success' | 'error' | null
	>(null);
	const [coverageExpanded, setCoverageExpanded] = useState(false);
	const premiumProgress = (insuranceDetails.premiumPaid / insuranceDetails.premiumTotal) * 100;

	const statusColors = {
		active: 'bg-emerald-500',
		expiring: 'bg-amber-500',
		expired: 'bg-rose-500',
	};

	const handlePayment = async () => {
		setShowPaymentAlert(true);
		setPaymentStatus('initiating');
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setPaymentStatus('processing');
		await new Promise((resolve) => setTimeout(resolve, 3000));
		const success = Math.random() > 0.2; // 80% success rate
		setPaymentStatus(success ? 'success' : 'error');
		if (success) {
			insuranceDetails.premiumPaid += insuranceDetails.nextPaymentAmount;
			insuranceDetails.nextPaymentAmount = 0;
		}
	};

	useEffect(() => {
		if (paymentStatus === 'success' || paymentStatus === 'error') {
			const timer = setTimeout(() => {
				setShowPaymentAlert(false);
				setPaymentStatus(null);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [paymentStatus]);

	const aiRiskAssessment = () => {
		const riskFactors = [
			{
				factor: 'Vehicle Age',
				risk: insuranceDetails.vehicleDetails.year < 2020 ? 'Medium' : 'Low',
			},
			{ factor: 'Policy Type', risk: insuranceDetails.type === 'Comprehensive' ? 'Low' : 'Medium' },
			{ factor: 'Payment History', risk: premiumProgress > 90 ? 'Low' : 'Medium' },
		];
		return riskFactors;
	};

	return (
		<Card className="w-full overflow-hidden">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg font-semibold flex items-center justify-between">
					<span className="flex items-center">
						<Shield className="w-5 h-5 mr-2 text-primary" />
						Insurance Policy
					</span>
					<Badge variant="outline" className={cn('text-xs', statusColors[insuranceDetails.status])}>
						{insuranceDetails.status}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="coverage">Coverage</TabsTrigger>
						<TabsTrigger value="payments">Payments</TabsTrigger>
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
										<span className="text-sm text-muted-foreground">Policy Number</span>
										<span className="font-medium">{insuranceDetails.policyNumber}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">Type</span>
										<span className="font-medium">{insuranceDetails.type}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">Coverage Amount</span>
										<span className="font-medium">
											KSh {insuranceDetails.coverageAmount.toLocaleString()}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">Valid Until</span>
										<span className="font-medium">{insuranceDetails.endDate}</span>
									</div>
								</div>
								<Card className="bg-muted">
									<CardHeader className="pb-2">
										<CardTitle className="text-sm font-medium">Insured Vehicle</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="flex justify-between items-center">
											<span className="text-sm text-muted-foreground">Make & Model</span>
											<span className="font-medium">
												{insuranceDetails.vehicleDetails.make}{' '}
												{insuranceDetails.vehicleDetails.model}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-muted-foreground">Year</span>
											<span className="font-medium">{insuranceDetails.vehicleDetails.year}</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-muted-foreground">Registration</span>
											<span className="font-medium">
												{insuranceDetails.vehicleDetails.registrationNumber}
											</span>
										</div>
									</CardContent>
								</Card>
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="outline" className="w-full">
											<FileText className="w-4 h-4 mr-2" />
											View Full Policy Details
										</Button>
									</DialogTrigger>
									<DialogContent className="max-w-3xl">
										<DialogHeader>
											<DialogTitle>Full Policy Details</DialogTitle>
											<DialogDescription>
												Comprehensive information about your insurance policy and AI-powered risk
												assessment.
											</DialogDescription>
										</DialogHeader>
										<ScrollArea className="h-[400px] rounded-md border p-4">
											{/* Add full policy details here */}
											<h3 className="text-lg font-semibold mb-2">AI Risk Assessment</h3>
											<div className="space-y-2">
												{aiRiskAssessment().map((factor, index) => (
													<div
														key={`${index}-${factor.factor}`}
														className="flex justify-between items-center p-2 bg-muted rounded-md"
													>
														<span className="text-sm font-medium">{factor.factor}</span>
														<Badge
															variant="outline"
															className={cn(
																'text-xs',
																factor.risk === 'Low'
																	? 'bg-green-100 text-green-800'
																	: factor.risk === 'Medium'
																		? 'bg-yellow-100 text-yellow-800'
																		: 'bg-red-100 text-red-800',
															)}
														>
															{factor.risk} Risk
														</Badge>
													</div>
												))}
											</div>
										</ScrollArea>
									</DialogContent>
								</Dialog>
							</TabsContent>
							<TabsContent value="coverage" className="p-4 space-y-4">
								<div className="space-y-2">
									{coverageOptions
										.slice(0, coverageExpanded ? undefined : 3)
										.map((option, index) => (
											<div
												key={`${index}-${option.name}`}
												className="flex justify-between items-center p-2 bg-muted rounded-md"
											>
												<span className="text-sm font-medium">{option.name}</span>
												{option.included ? (
													<CheckCircle className="w-4 h-4 text-green-500" />
												) : (
													<XCircle className="w-4 h-4 text-red-500" />
												)}
											</div>
										))}
								</div>
								{!coverageExpanded && (
									<Button
										variant="link"
										onClick={() => setCoverageExpanded(true)}
										className="w-full"
									>
										Show More <ChevronDown className="w-4 h-4 ml-2" />
									</Button>
								)}
								<Dialog>
									<DialogTrigger asChild>
										<Button className="w-full">
											<Umbrella className="w-4 h-4 mr-2" />
											Customize Coverage
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Customize Your Coverage</DialogTitle>
											<DialogDescription>
												Adjust your coverage options to better suit your needs.
											</DialogDescription>
										</DialogHeader>
										<div className="space-y-4 py-4">
											{coverageOptions.map((option, index) => (
												<div
													key={`${index}-${option.name}`}
													className="flex items-center justify-between"
												>
													<Label
														htmlFor={`coverage-${index}`}
														className="flex items-center space-x-2"
													>
														<input
															id={`coverage-${index}`}
															type="checkbox"
															checked={option.included}
															onChange={() => {
																// In a real app, this would update the coverage
																console.log(`Toggled ${option.name}`);
															}}
															className="form-checkbox h-4 w-4 text-primary"
														/>
														<span>{option.name}</span>
													</Label>
													<Badge variant="outline" className="ml-2">
														{option.included ? 'Included' : 'Not Included'}
													</Badge>
												</div>
											))}
										</div>
										<Button className="w-full">Update Coverage</Button>
									</DialogContent>
								</Dialog>
							</TabsContent>
							<TabsContent value="payments" className="p-4 space-y-4">
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<span className="text-sm font-medium">Total Premium</span>
										<span className="text-lg font-bold">
											KSh {insuranceDetails.premiumTotal.toLocaleString()}
										</span>
									</div>
									<div className="space-y-1">
										<div className="flex justify-between text-sm">
											<span className="text-muted-foreground">Premium Paid</span>
											<span>{premiumProgress.toFixed(0)}%</span>
										</div>
										<Progress value={premiumProgress} className="h-2" />
										<div className="flex justify-between text-xs text-muted-foreground">
											<span>KSh {insuranceDetails.premiumPaid.toLocaleString()} paid</span>
											<span>KSh {insuranceDetails.premiumTotal.toLocaleString()} total</span>
										</div>
									</div>
								</div>
								{insuranceDetails.nextPaymentAmount > 0 && (
									<Card className="bg-muted">
										<CardContent className="p-4">
											<div className="flex justify-between items-center mb-2">
												<span className="text-sm font-medium">Next Payment</span>
												<Badge variant="outline" className="text-xs">
													{insuranceDetails.nextPaymentDate}
												</Badge>
											</div>
											<div className="flex justify-between items-center">
												<span className="text-lg font-bold">
													KSh {insuranceDetails.nextPaymentAmount.toLocaleString()}
												</span>
												<Button size="sm" onClick={handlePayment}>
													Pay Now
												</Button>
											</div>
										</CardContent>
									</Card>
								)}
								{showPaymentAlert && (
									<AnimatePresence>
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{ duration: 0.2 }}
										>
											{paymentStatus === 'initiating' && (
												<Alert>
													<AlertTitle className="text-sm text-blue-600 flex justify-start gap-1 items-center">
														<span className="animate-pulse">Initiating payment</span>
														<span>
															<span className="inline-block animate-bounce [animation-duration:1.2s]">
																.
															</span>
															<span className="inline-block animate-bounce [animation-delay:0.2s] [animation-duration:1.2s]">
																.
															</span>
															<span className="inline-block animate-bounce [animation-delay:0.4s] [animation-duration:1.2s]">
																.
															</span>
														</span>
													</AlertTitle>
													<AlertDescription className="text-gray-700 text-xs">
														Please wait while we process your request
													</AlertDescription>
												</Alert>
											)}
											{paymentStatus === 'processing' && (
												<Alert>
													<AlertTitle className="text-sm text-yellow-600 flex justify-start gap-1 items-center">
														<span>Processing Payment</span>
														<span>
															<CreditCard className="h-4 w-4 text-yellow-600 animate-spin" />
														</span>
													</AlertTitle>
													<AlertDescription className="text-gray-700 text-xs">
														Your payment is currently being processed. Please wait.
													</AlertDescription>
												</Alert>
											)}
											{paymentStatus === 'success' && (
												<Alert>
													<AlertTitle className="text-xs text-green-600 flex justify-start gap-1 items-center">
														<span>Payment Successful</span>
														<CheckCircle className="h-4 w-4 text-green-600" />
													</AlertTitle>
													<AlertDescription className="text-gray-700 text-xs">
														Your payment has been processed successfully
													</AlertDescription>
												</Alert>
											)}
											{paymentStatus === 'error' && (
												<Alert>
													<AlertTitle className="text-xs text-red-600 flex justify-start gap-1 items-center">
														<span>Payment Error</span>
														<XCircle className="h-4 w-4 text-red-600" />
													</AlertTitle>
													<AlertDescription className="text-gray-700 text-xs">
														There was an error processing your payment. Please try again.
													</AlertDescription>
												</Alert>
											)}
										</motion.div>
									</AnimatePresence>
								)}
								<Button variant="outline" className="w-full">
									<Calendar className="w-4 h-4 mr-2" />
									View Payment History
								</Button>
							</TabsContent>
						</motion.div>
					</AnimatePresence>
				</Tabs>
			</CardContent>
		</Card>
	);
}
