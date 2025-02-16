import { DashboardShell } from '@/components/sacco/dashboard-shell';
import { FinanceDashboard } from '@/components/sacco/finance-dashboard';
import { PaymentsManagement } from '@/components/sacco/payments-management';

export default function PaymentsPage() {
	return (
		<div className="max-w-3xl mx-auto mt-10">
			<PaymentsManagement />
			<FinanceDashboard />
		</div>
	);
}
