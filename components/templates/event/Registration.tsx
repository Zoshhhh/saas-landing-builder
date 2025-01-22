import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Registration() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Register for the Event</h2>
                <div className="max-w-md mx-auto">
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input type="text" placeholder="First Name" />
                            <Input type="text" placeholder="Last Name" />
                        </div>
                        <Input type="email" placeholder="Email Address" />
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select ticket type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="standard">Standard Ticket</SelectItem>
                                <SelectItem value="vip">VIP Ticket</SelectItem>
                                <SelectItem value="group">Group Ticket (5+)</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="submit" className="w-full">
                            Register Now
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

