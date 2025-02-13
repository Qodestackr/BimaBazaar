import { DashboardShell } from "@/components/sacco/dashboard-shell"
import { PaymentsManagement } from "@/components/sacco/payments-management"

export default function PaymentsPage() {
    return (
        <DashboardShell>
            <h1 className="text-2xl font-bold mb-4">Payments Management</h1>
            <PaymentsManagement />
        </DashboardShell>
    )
}