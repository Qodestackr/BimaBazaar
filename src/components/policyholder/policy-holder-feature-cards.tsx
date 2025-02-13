"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Car, Shield, CreditCard, Users, FileText, HelpCircle } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCard {
    title: string
    description: string
    icon: React.ElementType
    href: string
    color: string
}

const featureCards: FeatureCard[] = [
    {
        title: "My Vehicle",
        description: "View and manage your vehicle details",
        icon: Car,
        href: "/dashboard/policyholder/vehicle",
        color: "bg-blue-500",
    },
    {
        title: "Insurance",
        description: "Check your policy and file claims",
        icon: Shield,
        href: "/dashboard/policyholder/insurance",
        color: "bg-green-500",
    },
    {
        title: "Payments",
        description: "View transactions and make payments",
        icon: CreditCard,
        href: "/dashboard/policyholder/payments",
        color: "bg-purple-500",
    },
    {
        title: "SACCO",
        description: "Access SACCO services and information",
        icon: Users,
        href: "/dashboard/policyholder/sacco",
        color: "bg-yellow-500",
    },
    {
        title: "Documents",
        description: "Access and upload important documents",
        icon: FileText,
        href: "/dashboard/policyholder/documents",
        color: "bg-red-500",
    },
    {
        title: "Support",
        description: "Get help and contact customer service",
        icon: HelpCircle,
        href: "/dashboard/policyholder/support",
        color: "bg-indigo-500",
    },
]

export function PolicyHolderFeatureCards() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featureCards.map((card, index) => (
                <Link key={card.title} href={card.href}>
                    <Card
                        className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center space-y-2">
                                <div className={`p-3 rounded-full ${card.color}`}>
                                    <card.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-semibold">{card.title}</h3>
                                <p className="text-sm text-muted-foreground">{card.description}</p>
                            </div>
                        </CardContent>
                        <motion.div
                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-white font-semibold">View {card.title}</span>
                        </motion.div>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
