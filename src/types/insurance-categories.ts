export interface InsuranceCategory {
	id: string;
	title: string;
	description: string;
	icon: string;
	offer?: {
		text: string;
		type: "discount" | "feature" | "new" | "premium";
	};
	href: string;
}

export interface InsuranceCategoryListProps {
	categories: InsuranceCategory[];
	layout?: "grid" | "list";
}
