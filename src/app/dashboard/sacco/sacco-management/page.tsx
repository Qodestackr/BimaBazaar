import { DashboardShell } from "@/components/sacco/dashboard-shell"
import { SACCOManagement } from "@/components/sacco/sacco-management"

export default function SACCOManagementPage() {
    return (
        <DashboardShell>
            <h1 className="text-2xl font-bold mb-4">SACCO Management</h1>
            <SACCOManagement />
        </DashboardShell>
    )
}