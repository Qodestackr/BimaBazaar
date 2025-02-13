import type { ReactNode } from "react"
import { UserNav } from "@/components/layouts/user-nav"

export function DashboardShell({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="border-b">
                <div className="container flex h-16 items-center justify-between">
                    <h1 className="text-lg font-bold">BimaBazaar</h1>
                    <UserNav />
                </div>
            </header>
            <main className="flex-1 container py-6">{children}</main>
        </div>
    )
}