import { PolicyHolderFeatureCards } from "@/components/policyholder/policy-holder-feature-cards"

export default function PolicyholderDashboard() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <h1 className="text-2xl font-bold mb-6">Policyholder Dashboard</h1>

            <section>
                <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
                <PolicyHolderFeatureCards />
            </section>
        </div>
    )
}
