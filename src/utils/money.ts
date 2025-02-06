export const formatMoney = (amount: number, currency = "KES") => {
	return new Intl.NumberFormat("en-KE", {
		style: "currency",
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);
};

export const toFixed = (amount: number, decimals = 2) => {
	return Number.parseFloat(amount.toFixed(decimals));
};

export const convertCurrency = (amount: number, rate: number) => {
	return toFixed(amount * rate);
};

// Example Usage:
// formatMoney(10000)  -> "KSh 10,000.00"
// formatMoney(10000, "USD") -> "$10,000.00"
// convertCurrency(1000, 0.008) -> Converts KSh 1000 to USD at 0.008 rate
