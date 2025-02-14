import { PolicyHolderFeatureCards } from '@/components/policyholder/policy-holder-feature-cards';

export default function PolicyholderDashboard() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
			<h3 className="text-sm font-light">Welcome,</h3>
			<PolicyHolderFeatureCards />
		</div>
	);
}
