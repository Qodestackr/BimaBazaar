import { DashboardShell } from '@/components/sacco/dashboard-shell';
import { InsuranceManagement } from '@/components/sacco/insurance-management';

export default function InsurancePage() {
	return (
		<DashboardShell>
			<h1 className="text-2xl font-bold mb-4">Insurance Management</h1>
			<InsuranceManagement />
		</DashboardShell>
	);
}
