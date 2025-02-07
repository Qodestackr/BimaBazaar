import type { InsuranceCategory } from "@/types/insurance-categories";

export const insuranceCategories: InsuranceCategory[] = [
  {
    id: "1",
    title: "Car Insurance",
    description:
      "Comprehensive coverage for your vehicle with 24/7 roadside assistance",
    icon: "/product.webp",
    offer: {
      text: "Up to 75% Cheaper",
      type: "discount",
    },
    href: "/insurance/car",
  },
  {
    id: "2",
    title: "Health Insurance",
    description: "Quality healthcare coverage for you and your family",
    icon: "/product.webp",
    offer: {
      text: "New Family Plans",
      type: "new",
    },
    href: "/insurance/health",
  },
  {
    id: "3",
    title: "Life Insurance",
    description: "Secure your family's future with comprehensive life coverage",
    icon: "/product.webp",
    offer: {
      text: "Premium Benefits",
      type: "premium",
    },
    href: "/insurance/life",
  },
  {
    id: "4",
    title: "Travel Insurance",
    description: "Worry-free adventures with worldwide coverage",
    icon: "/product.webp",
    offer: {
      text: "23% Off Today",
      type: "discount",
    },
    href: "/insurance/travel",
  },
] as const;
