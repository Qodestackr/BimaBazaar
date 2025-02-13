import { DashboardShell } from "@/components/sacco/dashboard-shell";
import { FeatureCards } from "@/components/sacco/feature-cards";

export default function Home() {
    return (
        <DashboardShell>
            <h1 className="text-2xl font-bold mb-4">Welcome to BimaBazaar</h1>
            <FeatureCards />
        </DashboardShell>
    )
}