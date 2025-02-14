import { DashboardShell } from '@/components/sacco/dashboard-shell';
import { FleetManagement } from '@/components/sacco/fleet-management';

export default function FleetPage() {
	return (
		<DashboardShell>
			<h1 className="text-2xl font-bold mb-4">Fleet Management</h1>
			<FleetManagement />
		</DashboardShell>
	);
}
