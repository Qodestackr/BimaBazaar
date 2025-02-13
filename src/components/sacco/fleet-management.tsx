"use client"

import React, { useState, useMemo } from "react"
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table"
import { Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface VehicleItem {
    id: string
    regNumber: string
    driver: string
    status: "active" | "maintenance" | "inactive"
    lastService: string
    nextService: string
    fuelEfficiency: number
}

const VEHICLES: VehicleItem[] = [
    {
        id: "1",
        regNumber: "KAA 123B",
        driver: "John Doe",
        status: "active",
        lastService: "2024-05-15",
        nextService: "2024-08-15",
        fuelEfficiency: 12.5,
    },
    {
        id: "2",
        regNumber: "KBB 456C",
        driver: "Jane Smith",
        status: "maintenance",
        lastService: "2024-04-30",
        nextService: "2024-07-30",
        fuelEfficiency: 11.8,
    },
    {
        id: "3",
        regNumber: "KCC 789D",
        driver: "Bob Johnson",
        status: "inactive",
        lastService: "2024-03-20",
        nextService: "2024-06-20",
        fuelEfficiency: 13.2,
    },
    // Add more sample data here...
]

const columnHelper = createColumnHelper<VehicleItem>()

export function FleetManagement() {
    const [vehicles] = useState<VehicleItem[]>(VEHICLES)
    const [globalFilter, setGlobalFilter] = useState("")

    const columns = useMemo(
        () => [
            columnHelper.accessor("regNumber", {
                cell: (info) => info.getValue(),
                header: "Reg Number",
            }),
            columnHelper.accessor("driver", {
                cell: (info) => info.getValue(),
                header: "Driver",
            }),
            columnHelper.accessor("status", {
                cell: (info) => (
                    <Badge
                    // variant={
                    //   info.getValue() === "active" ? "success" : info.getValue() === "maintenance" ? "warning" : "destructive"
                    // }
                    >
                        {info.getValue()}
                    </Badge>
                ),
                header: "Status",
            }),
            columnHelper.display({
                id: "actions",
                cell: () => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Update status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Schedule service</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
                header: "",
            }),
        ],
        [],
    )

    const table = useReactTable({
        data: vehicles,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    })

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Fleet Management</CardTitle>
                        <CardDescription>Manage your vehicles and drivers</CardDescription>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Vehicle
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Input
                        placeholder="Search vehicles..."
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                        >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <tr className="border-b border-muted last:border-b-0">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-4 py-2 text-sm">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-muted last:border-b-0">
                                        <td colSpan={columns.length} className="px-4 py-2">
                                            <div className="grid grid-cols-2 gap-4 text-xs">
                                                <div>
                                                    <span className="font-medium">Last Service:</span> {row.original.lastService}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Next Service:</span> {row.original.nextService}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Fuel Efficiency:</span> {row.original.fuelEfficiency} km/l
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <div className="flex-1 text-sm text-muted-foreground">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
                    {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length,
                    )}{" "}
                    of {table.getFilteredRowModel().rows.length} vehicles
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}