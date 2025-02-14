'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
	AlertCircle,
	AlertTriangle,
	Calendar,
	Car,
	CheckCircle,
	Clock,
	FileText,
	Fuel,
	Shield,
	PenToolIcon as Tool,
	Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ServiceHistory {
	date: string;
	type: string;
	mileage: number;
	status: 'completed' | 'scheduled';
	description?: string;
}

interface Alert {
	type: 'warning' | 'info';
	message: string;
}

const vehicleDetails = {
	regNumber: 'KAA 123B',
	make: 'Toyota',
	model: 'Hiace',
	year: 2020,
	fuelType: 'Diesel',
	lastService: '2024-03-15',
	nextService: '2024-09-15',
	mileage: 45000,
	fuelEfficiency: 12.5, // km/L
	insuranceCoverage: 85, // percentage
	serviceHistory: [
		{
			date: '2024-03-15',
			type: 'Full Service',
			mileage: 45000,
			status: 'completed',
			description:
				'Comprehensive service including oil change, filter replacement, and brake inspection.',
		},
		{
			date: '2023-09-10',
			type: 'Regular Maintenance',
			mileage: 40000,
			status: 'completed',
			description: 'Routine check-up and minor adjustments.',
		},
		{
			date: '2024-09-15',
			type: 'Regular Maintenance',
			mileage: 50000,
			status: 'scheduled',
			description: 'Upcoming routine maintenance and safety check.',
		},
	] as ServiceHistory[],
	alerts: [
		{
			type: 'warning',
			message: 'Tire pressure low in rear left tire',
		},
		{
			type: 'info',
			message: 'Next oil change due in 2000 km',
		},
	] as Alert[],
};

const HealthIndicator: React.FC<{ value: number; label: string }> = ({ value, label }) => (
	<div className="space-y-2">
		<div className="flex justify-between text-sm">
			<span>{label}</span>
			<span className="font-medium">{value}%</span>
		</div>
		<Progress value={value} className="h-2" />
	</div>
);

export function VehicleDetails() {
	const [activeSection, setActiveSection] = useState<string | null>('overview');
	const router = useRouter();

	return (
		<div className="space-y-4 p-4">
			<Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden">
				<CardContent className="p-6 relative">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-white/20 rounded-lg">
								<Car className="w-8 h-8" />
							</div>
							<div>
								<h2 className="text-2xl font-bold">{vehicleDetails.regNumber}</h2>
								<p className="text-white/80">
									{vehicleDetails.make} {vehicleDetails.model} {vehicleDetails.year}
								</p>
							</div>
						</div>
						<Badge variant="outline" className="bg-white/20 text-white border-white/40">
							Active
						</Badge>
					</div>
					<motion.div
						className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full"
						animate={{
							scale: [1, 1.1, 1],
							rotate: [0, 45, 0],
						}}
						transition={{
							duration: 12,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'linear',
						}}
					/>
				</CardContent>
			</Card>

			<Tabs defaultValue="overview" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="service">Service</TabsTrigger>
					<TabsTrigger value="alerts">Alerts</TabsTrigger>
				</TabsList>
				<TabsContent value="overview">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg font-semibold flex items-center gap-2">
								<Tool className="w-5 h-5" />
								Vehicle Overview
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-sm text-muted-foreground">Fuel Type</p>
									<div className="flex items-center gap-2 mt-1">
										<Fuel className="w-4 h-4" />
										<span>{vehicleDetails.fuelType}</span>
									</div>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">Current Mileage</p>
									<p className="mt-1">{vehicleDetails.mileage.toLocaleString()} km</p>
								</div>
							</div>
							<Separator />
							<div className="space-y-4">
								<HealthIndicator
									value={vehicleDetails.insuranceCoverage}
									label="Insurance Coverage"
								/>
								<HealthIndicator value={75} label="Overall Vehicle Health" />
							</div>
							<div className="bg-muted/50 p-4 rounded-lg">
								<h4 className="font-medium mb-2 flex items-center gap-2">
									<Zap className="w-4 h-4" />
									Fuel Efficiency
								</h4>
								<p className="text-2xl font-bold">{vehicleDetails.fuelEfficiency} km/L</p>
								<p className="text-sm text-muted-foreground mt-1">Last updated: Today</p>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="service">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg font-semibold flex items-center gap-2">
								<Calendar className="w-5 h-5" />
								Service History
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{vehicleDetails.serviceHistory.map((service, index) => (
									<div
										key={`${index}-${service.type}`}
										className="flex items-start justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
									>
										<div>
											<div className="flex items-center gap-2">
												{service.status === 'completed' ? (
													<CheckCircle className="w-4 h-4 text-green-500" />
												) : (
													<Clock className="w-4 h-4 text-amber-500" />
												)}
												<span className="font-medium">{service.type}</span>
											</div>
											<p className="text-sm text-muted-foreground mt-1">
												{service.mileage.toLocaleString()} km
											</p>
											{service.description && <p className="text-sm mt-2">{service.description}</p>}
										</div>
										<div className="text-right">
											<span className="text-sm font-medium">{service.date}</span>
											{service.status === 'scheduled' && (
												<Badge variant="outline" className="ml-2">
													Upcoming
												</Badge>
											)}
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="alerts">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg font-semibold flex items-center gap-2">
								<AlertCircle className="w-5 h-5" />
								Vehicle Alerts
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{vehicleDetails.alerts.map((alert, index) => (
									<div
										key={`${index}-${alert.type}`}
										className={cn(
											'p-4 rounded-lg flex items-start gap-3',
											alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100',
										)}
									>
										{alert.type === 'warning' ? (
											<AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
										) : (
											<AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
										)}
										<div>
											<p
												className={cn(
													'font-medium',
													alert.type === 'warning' ? 'text-yellow-700' : 'text-blue-700',
												)}
											>
												{alert.message}
											</p>
											<p
												className={cn(
													'text-sm mt-1',
													alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600',
												)}
											>
												{alert.type === 'warning' ? 'Action required' : 'For your information'}
											</p>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardContent className="p-4">
						<Button variant="outline" className="w-full">
							<Shield className="w-4 h-4 mr-2" />
							View Insurance Details
						</Button>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<Button variant="outline" className="w-full">
							<FileText className="w-4 h-4 mr-2" />
							Download Vehicle Report
						</Button>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardContent className="p-4">
					<Button
						onClick={() => router.push('/dashboard/policyholder/support')}
						variant="destructive"
						className="w-full"
					>
						<AlertCircle className="w-4 h-4 mr-2" />
						Report an Issue
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
