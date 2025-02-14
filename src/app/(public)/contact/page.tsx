'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormSubmitted(true);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-600 to-black py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<Card className="bg-white shadow-xl rounded-lg overflow-hidden">
					<CardHeader className="">
						<CardTitle className="text-2xl">Get in Touch</CardTitle>
						<CardDescription>We're here to help with your matatu insurance needs</CardDescription>
					</CardHeader>
					<CardContent className="p-2">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							<div className="space-y-2">
								<h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
								<div className="flex items-center space-x-2 text-gray-600">
									<MapPin className="h-5 w-5 text-gray-600" />
									<span className="text-sm">123 Matatu Plaza, Nairobi, Kenya</span>
								</div>
								<div className="flex items-center space-x-2 text-gray-600">
									<Phone className="h-5 w-5 text-gray-600" />
									<span className="text-sm">+254 123 456 789</span>
								</div>
								<div className="flex items-center space-x-2 text-gray-600">
									<Mail className="h-5 w-5 text-gray-600" />
									<span className="text-sm">info@matutuinsurance.com</span>
								</div>
								<div className="flex items-center space-x-2 text-gray-600">
									<MessageSquare className="h-5 w-5 text-gray-600" />
									<span className="text-sm">Live chat available 24/7</span>
								</div>

								{/*  */}
								<div className="w-full">
									<h3 className="text-xl font-semibold text-gray-800 mb-2">
										How can we assist you?
									</h3>
									<RadioGroup defaultValue="quote">
										<div className="flex flex-col space-y-2">
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="quote" id="quote" />
												<Label htmlFor="quote">Get a quote</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="claim" id="claim" />
												<Label htmlFor="claim">File a claim</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="policy" id="policy" />
												<Label htmlFor="policy">Policy questions</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="other" id="other" />
												<Label htmlFor="other">Other inquiries</Label>
											</div>
										</div>
									</RadioGroup>
									<div>
										<Link className="mt-3 text-blue-400" href={'/dashboard/policyholder/support'}>
											Chat With Bazaar
										</Link>
									</div>
								</div>
								{/*  */}
							</div>
							<div>
								<h3 className="text-xl font-semibold text-gray-800 mb-4">Send us a message</h3>
								{formSubmitted ? (
									<div
										className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
										role="alert"
									>
										<strong className="font-bold">Thank you for your message!</strong>
										<p className="block sm:inline">We'll get back to you soon.</p>
									</div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="name">Name</Label>
											<Input id="name" placeholder="Your name" required />
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input id="email" type="email" placeholder="Your email" required />
										</div>
										<div className="space-y-2">
											<Label htmlFor="message">Message</Label>
											<Textarea id="message" placeholder="How can we help?" required />
										</div>
										<Button type="submit" className="w-full bg-green-500">
											<Send className="mr-2 h-4 w-4" /> Send Message
										</Button>
									</form>
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
