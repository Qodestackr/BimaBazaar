"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeftCircle, MessageCircle, ThumbsUp } from "lucide-react"
import { AIRecommendedBadge } from "@/components/compare-plans/ai/ai-recommended-badge"

interface Quote {
    name: string
    provider: string
    price: number
    match: number
    features: string[]
    isBestFit?: boolean
}

export function QuickQuote() {
    const [route, setRoute] = useState("")
    const [showQuotes, setShowQuotes] = useState(false)
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

    const router = useRouter()


    // Simulated quotes data
    const quotes: Quote[] = [
        {
            name: "Basic Cover",
            provider: "SafeGuard",
            price: 1500,
            match: 70,
            features: ["Third Party Liability", "Driver Personal Accident"],
        },
        {
            name: "Standard Cover",
            provider: "SecureLife",
            price: 3000,
            match: 75,
            features: [
                "Third Party Liability",
                "Driver Personal Accident",
                "Passenger Liability",
                "Comprehensive Cover",
                "Breakdown Assistance",
            ],
            isBestFit: true,
        },
        {
            name: "Premium Cover",
            provider: "WellCare",
            price: 5000,
            match: 80,
            features: [
                "Third Party Liability",
                "Driver Personal Accident",
                "Passenger Liability",
                "Comprehensive Cover",
                "Breakdown Assistance",
            ],
        },
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setShowQuotes(true)
    }

    return (
        <div className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
                {!showQuotes ? (
                    <motion.form
                        key="quote-form"
                        onSubmit={handleSubmit}
                        className="p-4 rounded-lg shadow-lg bg-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h2 className="text-lg font-semibold mb-3">Get a Quick Quote</h2>
                        <div className="space-y-2">
                            <Label htmlFor="route" className="text-sm">
                                Your Matatu Route
                            </Label>
                            <Input
                                id="route"
                                placeholder="e.g., Nairobi - Thika"
                                value={route}
                                onChange={(e) => setRoute(e.target.value)}
                                required
                                className="bg-background"
                            />
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            Get Instant Quote
                        </Button>
                    </motion.form>
                ) : (
                    <motion.div
                        key="quote-results"
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="flex items-center justify-between">
                            <Button
                                variant="ghost"
                                className="text-xs h-8"
                                size="sm"
                                onClick={() => setShowQuotes(false)}
                            >
                                <ChevronLeftCircle className="w-4 h-4 mr-1" />
                                <span className="text-[10px]">Back</span>
                            </Button>
                            <h2 className="text-sm">Best Matches for {route}</h2>
                        </div>

                        <div className="space-y-2">
                            {quotes.map((quote, index) => (
                                <motion.div
                                    key={quote.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <QuoteCard
                                        quote={quote}
                                        isSelected={selectedQuote?.name === quote.name}
                                        onSelect={() => setSelectedQuote(quote)}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="p-2 bg-background border-t"
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="max-w-md mx-auto flex gap-1">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => router.push("/policies")}
                                >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Ask a Question
                                </Button>
                                <Button variant="outline" onClick={() => router.push("/policies")}>
                                    Compare Plans
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => router.push("/policies")}
                                >
                                    <ThumbsUp className="w-4 h-4 mr-2" />
                                    Get Covered Now
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

interface QuoteCardProps {
    quote: Quote
    isSelected: boolean
    onSelect: () => void
}

// Compact and CTA-focused QuoteCard for mobile
function QuoteCard({ quote, isSelected, onSelect }: QuoteCardProps) {
    return (
        <motion.div
            className={`p-2 rounded-md border flex items-center justify-between ${isSelected ? "border-primary" : "border-border"
                } cursor-pointer hover:border-primary transition-colors`}
            onClick={onSelect}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div>
                <h3 className="text-sm font-semibold">{quote.name}</h3>
                <p className="text-xs text-muted-foreground">{quote.provider}</p>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-xs font-bold">
                    KES {quote.price.toLocaleString()}/mo
                </span>
                {quote.isBestFit && (
                    <div className="mt-1">
                        <AIRecommendedBadge text="Best Fit" />
                    </div>
                )}
            </div>
        </motion.div>
    )
}