"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TransactionItem {
    id: string
    type: "payment" | "premium"
    amount: number
    description: string
    date: string
}

const TRANSACTIONS: TransactionItem[] = [
    { id: "1", type: "payment", amount: 5000, description: "Monthly premium payment", date: "2024-05-20" },
    { id: "2", type: "premium", amount: 2000, description: "Insurance premium deduction", date: "2024-05-18" },
    { id: "3", type: "payment", amount: 3000, description: "Additional coverage payment", date: "2024-05-15" },
]

export function PaymentHistory() {
    const [transactions] = useState<TransactionItem[]>(TRANSACTIONS)

    const balance = transactions.reduce(
        (acc, transaction) => (transaction.type === "payment" ? acc + transaction.amount : acc - transaction.amount),
        0
    )

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                    <span className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Payment History
                    </span>
                    <span className="text-sm font-normal">
                        Balance: KSh {balance.toLocaleString()}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200"
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className={`p-1.5 rounded-lg ${transaction.type === "payment" ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
                                        }`}
                                >
                                    {transaction.type === "payment" ? (
                                        <ArrowUpRight className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                    ) : (
                                        <ArrowDownLeft className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs font-medium">{transaction.description}</p>
                                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{transaction.date}</p>
                                </div>
                            </div>
                            <span
                                className={`text-xs font-medium ${transaction.type === "payment" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                    }`}
                            >
                                {transaction.type === "payment" ? "+" : "-"} KSh {transaction.amount.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                    View All Transactions
                </Button>
            </CardContent>
        </Card>
    )
}
