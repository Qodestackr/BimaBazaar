"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Car, Calendar, Fuel, PenToolIcon as Tool, ChevronDown } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface VehicleDetails {
    regNumber: string
    make: string
    model: string
    year: number
    fuelType: string
    lastService: string
    nextService: string
}

const vehicleDetails: VehicleDetails = {
    regNumber: "KAA 123B",
    make: "Toyota",
    model: "Hiace",
    year: 2020,
    fuelType: "Diesel",
    lastService: "2024-03-15",
    nextService: "2024-09-15",
}

export function VehicleDetails() {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Card className="w-full overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
                <motion.div
                    className="p-4 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white text-orange-500 p-2 rounded-full">
                                <Car className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{vehicleDetails.regNumber}</h2>
                                <p className="text-sm opacity-75">{vehicleDetails.make} {vehicleDetails.model}</p>
                            </div>
                        </div>
                        <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", isExpanded && "rotate-180")} />
                    </div>
                </motion.div>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 pb-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <VehicleInfoItem icon={Calendar} label="Year" value={vehicleDetails.year.toString()} />
                                    <VehicleInfoItem icon={Fuel} label="Fuel Type" value={vehicleDetails.fuelType} />
                                </div>
                                <div className="space-y-2">
                                    <VehicleInfoItem icon={Tool} label="Last Service" value={vehicleDetails.lastService} />
                                    <VehicleInfoItem icon={Tool} label="Next Service" value={vehicleDetails.nextService} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}

function VehicleInfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
                <Icon className="w-4 h-4 mr-1" />
                {label}
            </Badge>
            <span className="font-medium">{value}</span>
        </div>
    )
}