import type { InsuranceCategory } from "@/types/insurance-categories";

export const insuranceCategories: InsuranceCategory[] = [
  {
    id: "1",
    title: "Matatu Comprehensive",
    description: "Full protection for your matatu, passengers & income.",
    icon: "/product.webp", //"/matatu-comprehensive.webp",
    offer: {
      text: "Fleet Discounts Available",
      type: "discount",
    },
    href: "/insurance/matatu-comprehensive",
  },
  {
    id: "2",
    title: "Pay-As-You-Drive Cover",
    description: "Lower premiums when your matatu isn't on the road.",
    icon: "/product.webp", //"/pay-as-you-drive.webp",
    offer: {
      text: "GPS-Based Billing",
      type: "feature",
    },
    href: "/insurance/pay-as-you-drive",
  },
  {
    id: "3",
    title: "Passenger Liability Cover",
    description: "Legal protection for accidents involving passengers.",
    icon: "/product.webp", //"/passenger-liability.webp",
    offer: {
      text: "Best 75% of the time",
      type: "premium",
    },
    href: "/insurance/passenger-liability",
  },
  {
    id: "4",
    title: "SACCO Fleet Insurance",
    description: "Bulk insurance for SACCO-managed matatus with special rates.",
    icon: "/product.webp", //"/sacco-fleet.webp",
    offer: {
      text: "Exclusive SACCO Pricing",
      type: "discount",
    },
    href: "/insurance/sacco-fleet",
  },
  {
    id: "5",
    title: "Matatu Fire & Theft",
    description: "Protect your matatu from fire, theft, and vandalism.",
    icon: "/product.webp", //"/matatu-fire-theft.webp",
    offer: {
      text: "48hr Claim Settlements",
      type: "new",
    },
    href: "/insurance/matatu-fire-theft",
  },
] as const;
