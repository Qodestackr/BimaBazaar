"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, AlertCircle, CheckCircle, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface InsuranceDetails {
    policyNumber: string
    type: string
    status: "active" | "expiring" | "expired"
    expiryDate: string
    coverageAmount: number
    premiumPaid: number
    premiumTotal: number
}

const insuranceDetails: InsuranceDetails = {
    policyNumber: "POL-12345",
    type: "Comprehensive",
    status: "active",
    expiryDate: "2024-12-31",
    coverageAmount: 1000000,
    premiumPaid: 75000,
    premiumTotal: 100000,
}

export function InsuranceDetails() {
    const [isExpanded, setIsExpanded] = useState(false)

    const premiumProgress = (insuranceDetails.premiumPaid / insuranceDetails.premiumTotal) * 100

    return (
        <Card className="w-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
                <motion.div
                    className="p-4 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white text-blue-500 p-2 rounded-full">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Insurance Policy</h2>
                                <p className="text-sm opacity-75">{insuranceDetails.policyNumber}</p>
                            </div>
                        </div>
                        <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", isExpanded && "rotate-180")} />
                    </div>
                </motion.div>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 pb-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <InsuranceInfoItem label="Type" value={insuranceDetails.type} />
                                    <InsuranceInfoItem label="Status" value={insuranceDetails.status} isStatus />
                                    <InsuranceInfoItem label="Expiry Date" value={insuranceDetails.expiryDate} />
                                    <InsuranceInfoItem
                                        label="Coverage"
                                        value={`KSh ${insuranceDetails.coverageAmount.toLocaleString()}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Premium Payment</span>
                                        <span className="text-sm font-medium">{premiumProgress.toFixed(0)}% Paid</span>
                                    </div>
                                    <Progress value={premiumProgress} className="h-2 bg-white/20" />
                                    <div className="flex justify-between text-xs opacity-75">
                                        <span>KSh {insuranceDetails.premiumPaid.toLocaleString()} paid</span>
                                        <span>KSh {insuranceDetails.premiumTotal.toLocaleString()} total</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="secondary" size="sm" className="w-full bg-white/10 hover:bg-white/20">
                                        <AlertCircle className="w-4 h-4 mr-2" />
                                        File Claim
                                    </Button>
                                    <Button variant="secondary" size="sm" className="w-full bg-white/10 hover:bg-white/20">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Renew Policy
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}

function InsuranceInfoItem({ label, value, isStatus = false }: { label: string; value: string; isStatus?: boolean }) {
    return (
        <div className="flex flex-col">
            <span className="text-xs opacity-75">{label}</span>
            {isStatus ? (
                <Badge
                    className={cn(
                        "mt-1 w-fit",
                        value === "active" && "bg-green-500",
                        value === "expiring" && "bg-yellow-500",
                        value === "expired" && "bg-red-500",
                    )}
                >
                    {value}
                </Badge>
            ) : (
                <span className="font-medium">{value}</span>
            )}
        </div>
    )
}