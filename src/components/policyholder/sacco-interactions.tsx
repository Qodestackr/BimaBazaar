"use client"

import { Users, Briefcase, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SACCODetails {
    name: string
    membershipNumber: string
    joinDate: string
    contributionAmount: number
    lastContributionDate: string
}

const saccoDetails: SACCODetails = {
    name: "Matatu Owners SACCO",
    membershipNumber: "MOS-12345",
    joinDate: "2022-01-15",
    contributionAmount: 5000,
    lastContributionDate: "2024-05-01",
}

export function SACCOInteractions() {
    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    SACCO Membership
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                        <span>SACCO Name</span>
                        <span>{saccoDetails.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Membership Number</span>
                        <span>{saccoDetails.membershipNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Join Date</span>
                        <span>{saccoDetails.joinDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Monthly Contribution</span>
                        <span>KSh {saccoDetails.contributionAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Last Contribution</span>
                        <span>{saccoDetails.lastContributionDate}</span>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                        <Briefcase className="w-4 h-4 mr-2" />
                        View Savings
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Loan Options
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}