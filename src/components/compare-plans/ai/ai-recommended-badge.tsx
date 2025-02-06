"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface AIRecommendedBadgeProps {
    className?: string
    text?: string
}

export function AIRecommendedBadge({ className = "", text = "AI Recommended" }: AIRecommendedBadgeProps) {
    return (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Badge variant="default" className={`bg-gradient-to-r from-primary to-primary/80 ${className}`}>
                <Sparkles className="w-3 h-3 mr-1" />
                {text}
            </Badge>
        </motion.div>
    )
}