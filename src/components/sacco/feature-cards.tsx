import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bus, CreditCard, Users, Wallet } from "lucide-react"
import Link from "next/link"

const features = [
    {
        title: "Fleet Management",
        icon: Bus,
        description: "Manage your vehicles and drivers",
        href: "/dashboard/sacco/fleet",
    },
    {
        title: "Insurance",
        icon: CreditCard,
        description: "Handle insurance policies and claims",
        href: "/dashboard/sacco/insurance",
    },
    {
        title: "Payments",
        icon: Wallet,
        description: "Collect and manage payments",
        href: "/dashboard/sacco/payments",
    },
    {
        title: "SACCO Management",
        icon: Users,
        description: "Manage SACCO members and operations",
        href: "/dashboard/sacco/sacco-management",
    },
]

export function FeatureCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
                <Link href={feature.href} key={feature.title}>
                    <Card className="hover:bg-accent transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{feature.title}</CardTitle>
                            <feature.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}