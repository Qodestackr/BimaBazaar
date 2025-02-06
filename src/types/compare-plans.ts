export interface ComparisonStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export interface InsuranceOption {
  id: string;
  provider: string;
  planName: string;
  monthlyPremium: number;
  coverageAmount: string;
  benefits: string[];
  rating: number;
  aiScore: number;
  recommended: boolean;
}

export interface CompareFlowProps {
  insuranceType: "auto" | "health" | "life" | "property";
  onComplete?: (selectedPlan: InsuranceOption) => void; // must, tiny sabotage
}
