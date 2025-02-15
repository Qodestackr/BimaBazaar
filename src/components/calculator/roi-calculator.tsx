'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Briefcase, Building, Bus, MessageCircleMore } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type UserGroup = 'matatuOwner' | 'sacco' | 'underwriter';

const userGroupData = {
	matatuOwner: {
		icon: Bus,
		title: 'Matatu Owner',
		inputs: [
			{ label: 'Number of Vehicles', key: 'vehicleCount', defaultValue: 5, min: 1 },
			{
				label: 'Monthly Revenue per Vehicle (KSh)',
				key: 'monthlyRevenue',
				defaultValue: 100000,
				min: 0,
			},
			{
				label: 'Current Insurance Cost per Vehicle (KSh)',
				key: 'currentInsuranceCost',
				defaultValue: 50000,
				min: 0,
			},
			{ label: 'Annual Accidents per Vehicle', key: 'accidentFrequency', defaultValue: 2, min: 0 },
		],
	},
	sacco: {
		icon: Building,
		title: 'SACCO',
		inputs: [
			{ label: 'Number of Members', key: 'memberCount', defaultValue: 100, min: 1 },
			{ label: 'Average Fleet Size per Member', key: 'averageFleetSize', defaultValue: 5, min: 1 },
			{
				label: 'Annual Management Fees (KSh)',
				key: 'managementFees',
				defaultValue: 1000000,
				min: 0,
			},
			{ label: 'Annual Compliance Issues', key: 'complianceIssues', defaultValue: 20, min: 0 },
		],
	},
	underwriter: {
		icon: Briefcase,
		title: 'Underwriter',
		inputs: [
			{ label: 'Number of Policies', key: 'policyCount', defaultValue: 1000, min: 1 },
			{
				label: 'Average Premium per Policy (KSh)',
				key: 'averagePremium',
				defaultValue: 30000,
				min: 0,
			},
			{ label: 'Claim Frequency (%)', key: 'claimFrequency', defaultValue: 10, min: 0, max: 100 },
			{
				label: 'Annual Operational Costs (KSh)',
				key: 'operationalCosts',
				defaultValue: 5000000,
				min: 0,
			},
		],
	},
};

type InputConfig = (typeof userGroupData)[keyof typeof userGroupData]['inputs'][number];

export function ROICalculator() {
	const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);
	const [inputData, setInputData] = useState<Record<string, number>>({});
	const [results, setResults] = useState<any>(null);

	useEffect(() => {
		if (selectedGroup) {
			const initialData = userGroupData[selectedGroup].inputs.reduce(
				(acc, input) => ({
					...acc,
					[input.key]: Math.max(input.defaultValue, input.min || 0),
				}),
				{},
			);
			setInputData(initialData);
		}
	}, [selectedGroup]);

	const handleInputChange = (key: string, config: InputConfig, value: string) => {
		let numericValue = Number(value.replace(/[^0-9.]/g, ''));

		if (!Number.isNaN(numericValue)) {
			if (config.min !== undefined) numericValue = Math.max(numericValue, config.min);
			if (config.max !== undefined) numericValue = Math.min(numericValue, config.max);
			setInputData((prev) => ({ ...prev, [key]: numericValue }));
		}
	};

	const calculateROI = () => {
		if (!selectedGroup) return;

		try {
			let calculatedResults;
			switch (selectedGroup) {
				case 'matatuOwner': {
					const {
						vehicleCount = 5,
						monthlyRevenue = 100000,
						currentInsuranceCost = 50000,
						accidentFrequency = 2,
					} = inputData;
					const newInsuranceCost = currentInsuranceCost * 0.8;
					const accidentCostReduction = accidentFrequency * 50000 * 0.3;
					const annualSavings =
						(currentInsuranceCost - newInsuranceCost) * vehicleCount + accidentCostReduction;
					const roi = (annualSavings / (newInsuranceCost * vehicleCount)) * 100;

					calculatedResults = {
						annualSavings,
						roi,
						aiSummary: `By switching to BimaBazaar:
- Annual insurance costs reduced from KSh ${(currentInsuranceCost * vehicleCount).toLocaleString()} to KSh ${(newInsuranceCost * vehicleCount).toLocaleString()}
- Accident-related savings: KSh ${accidentCostReduction.toLocaleString()}
- Total annual savings: KSh ${annualSavings.toLocaleString()}
ROI of ${roi.toFixed(1)}% means you'll recover your insurance costs in ${(100 / roi).toFixed(1)} years.`,
					};
					break;
				}

				case 'sacco': {
					const {
						memberCount = 100,
						averageFleetSize = 5,
						managementFees = 1e6,
						complianceIssues = 20,
					} = inputData;
					const feeSavings = managementFees * 0.25;
					const complianceCostSavings = complianceIssues * 10000 * 0.5;
					const revenueShare = memberCount * averageFleetSize * 1000;
					const totalSavings = feeSavings + complianceCostSavings + revenueShare;
					const saccoRoi = (totalSavings / managementFees) * 100;

					calculatedResults = {
						totalSavings,
						roi: saccoRoi,
						chartData: [
							{ name: 'Fee Savings', value: feeSavings },
							{ name: 'Compliance Savings', value: complianceCostSavings },
							{ name: 'Revenue Share', value: revenueShare },
						],
						aiSummary: `SACCO Benefits Breakdown:
- Management fee reduction: 25% savings (KSh ${feeSavings.toLocaleString()})
- Compliance issue reduction: 50% cost avoidance (KSh ${complianceCostSavings.toLocaleString()})
- New revenue streams: KSh ${revenueShare.toLocaleString()} from fleet partnerships
Total benefit represents ${saccoRoi.toFixed(1)}% of current management fees.`,
					};
					break;
				}

				case 'underwriter': {
					const {
						policyCount = 1000,
						averagePremium = 3e4,
						claimFrequency = 10,
						operationalCosts = 5e6,
					} = inputData;
					const revenueIncrease = policyCount * averagePremium * 0.1;
					const claimCostReduction = (claimFrequency / 100) * policyCount * averagePremium * 0.2;
					const operationalSavings = operationalCosts * 0.15;
					const totalBenefit = revenueIncrease + claimCostReduction + operationalSavings;
					const underwriterRoi = (totalBenefit / operationalCosts) * 100;

					calculatedResults = {
						totalBenefit,
						roi: underwriterRoi,
						chartData: [
							{ name: 'Revenue Increase', value: revenueIncrease },
							{ name: 'Claim Cost Reduction', value: claimCostReduction },
							{ name: 'Operational Savings', value: operationalSavings },
						],
						aiSummary: `Underwriter Advantages:
- 10% policy growth potential: KSh ${revenueIncrease.toLocaleString()}
- 20% claims processing efficiency: KSh ${claimCostReduction.toLocaleString()}
- 15% operational cost savings: KSh ${operationalSavings.toLocaleString()}
Total benefit represents ${underwriterRoi.toFixed(1)}% ROI on operational costs.`,
					};
					break;
				}
			}

			setResults(calculatedResults);
		} catch (error) {
			console.error('Calculation error:', error);
			setResults({ error: 'Invalid calculation. Please check your inputs.' });
		}
	};

	const renderUserSelection = () => (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2"
		>
			{(Object.keys(userGroupData) as UserGroup[]).map((group) => {
				const { icon: Icon, title } = userGroupData[group];
				return (
					<Card
						key={group}
						className="cursor-pointer hover:bg-muted transition-colors"
						onClick={() => setSelectedGroup(group)}
					>
						<CardContent className="flex flex-col items-center justify-center p-4">
							<Icon className="w-8 h-8 mb-2 text-primary" />
							<h3 className="font-medium text-center">{title}</h3>
						</CardContent>
					</Card>
				);
			})}
		</motion.div>
	);

	const renderInputs = () => {
		if (!selectedGroup) return null;
		const { inputs } = userGroupData[selectedGroup];

		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="space-y-4"
			>
				<h2 className="text-xl">Let&apos;s do the Math</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
					{inputs.map((input) => (
						<div key={input.key} className="space-y-2">
							<Label htmlFor={input.key}>{input.label}</Label>
							<Input
								id={input.key}
								type="text"
								value={inputData[input.key]?.toLocaleString() || ''}
								onChange={(e) => handleInputChange(input.key, input, e.target.value)}
								pattern="[0-9]*"
							/>
						</div>
					))}
				</div>
				<Button
					onClick={calculateROI}
					className="w-full py-4 text-xs"
					disabled={Object.values(inputData).some((v) => v <= 0)}
				>
					Calculate ROI
					<ArrowRight className="ml-2 h-5 w-5" />
				</Button>
			</motion.div>
		);
	};

	const renderResults = () => {
		if (!results) return null;

		return (
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-6">
				<h2 className="text-2xl font-bold border-b pb-2">ROI Analysis</h2>

				{results.error ? (
					<div className="text-destructive">{results.error}</div>
				) : (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="bg-muted p-6 rounded-xl">
								<h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
								{selectedGroup === 'matatuOwner' && (
									<div className="space-y-2">
										<p className="text-2xl font-bold text-primary">
											KSh {results.annualSavings?.toLocaleString()}
										</p>
										<p>Annual Savings</p>
										<p className="text-xl mt-4">
											ROI: <span className="font-semibold">{results.roi?.toFixed(1)}%</span>
										</p>
									</div>
								)}
								{(selectedGroup === 'sacco' || selectedGroup === 'underwriter') && (
									<div className="space-y-2">
										<p className="text-2xl font-bold text-primary">
											KSh {(results.totalSavings || results.totalBenefit)?.toLocaleString()}
										</p>
										<p>{selectedGroup === 'sacco' ? 'Total Savings' : 'Total Benefit'}</p>
										<p className="text-xl mt-4">
											ROI: <span className="font-semibold">{results.roi?.toFixed(1)}%</span>
										</p>
									</div>
								)}
							</div>

							<div className="bg-muted p-6 rounded-xl">
								<h3 className="text-lg font-semibold mb-4">AI Insights</h3>
								<p className="whitespace-pre-line">{results.aiSummary}</p>
								<Link
									href="/dashboard/policyholder/support"
									className="inline-flex items-center mt-4 text-primary hover:underline font-medium"
								>
									<span className="text-blue-600 flex justify-center items-center gap-1">
										Discuss strategies with our AI advisor
										<MessageCircleMore className="mr-2 h-5 w-5" />
									</span>
								</Link>
							</div>
						</div>

						{(selectedGroup === 'sacco' || selectedGroup === 'underwriter') && (
							<div className="h-96 bg-muted p-4 rounded-xl">
								<ResponsiveContainer width="100%" height="100%" className="text-xs">
									<BarChart data={results.chartData} barSize={100}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis tickFormatter={(value) => `KSh ${(value / 1000).toFixed(0)}k`} />
										<Tooltip
											formatter={(value) => `KSh ${Number(value).toLocaleString()}`}
											cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
										/>
										<Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
									</BarChart>
								</ResponsiveContainer>
							</div>
						)}
					</>
				)}
			</motion.div>
		);
	};

	return (
		<div className="max-w-4xl mx-auto p-2">
			<AnimatePresence mode="wait">
				{!selectedGroup ? (
					<motion.div
						key="selection"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="text-center space-y-2"
					>
						<p className="text-muted-foreground text-lg">
							Select your role to estimate potential savings and benefits
						</p>
						{renderUserSelection()}
					</motion.div>
				) : (
					<motion.div
						key="calculator"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="space-y-8"
					>
						<Button
							variant="ghost"
							onClick={() => {
								setSelectedGroup(null);
								setResults(null);
							}}
							className="mb-4"
						>
							← Back to role selection
						</Button>
						{renderInputs()}
						{renderResults()}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
