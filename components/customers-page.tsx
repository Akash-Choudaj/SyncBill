"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, MoreHorizontal, Mail, Phone, Trash2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Sample customer data
const customers = [
  {
    id: "1",
    name: "Emma Johnson",
    email: "emma@example.com",
    phone: "+91 9876543210",
    company: "Acme Inc",
    status: "active",
    totalSpent: 2500,
    lastOrder: "2023-04-15",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+91 9876543211",
    company: "Globex Corp",
    status: "active",
    totalSpent: 1800,
    lastOrder: "2023-04-10",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    email: "sophia@example.com",
    phone: "+91 9876543212",
    company: "Stark Industries",
    status: "inactive",
    totalSpent: 3200,
    lastOrder: "2023-03-25",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@example.com",
    phone: "+91 9876543213",
    company: "Wayne Enterprises",
    status: "active",
    totalSpent: 1250,
    lastOrder: "2023-04-05",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: "5",
    name: "Olivia Taylor",
    email: "olivia@example.com",
    phone: "+91 9876543214",
    company: "Oscorp",
    status: "active",
    totalSpent: 4500,
    lastOrder: "2023-04-18",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
]

export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-zinc-400">Manage your customer relationships and track their activity.</p>
      </motion.div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-zinc-100">Customer List</CardTitle>
              <CardDescription className="text-zinc-400">
                View and manage all your customers in one place.
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Search customers..."
                  className="pl-8 bg-zinc-800 border-zinc-700 text-zinc-400 focus-visible:ring-orange-500 w-full sm:w-[200px] md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-900">
                <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableHead className="text-zinc-400">Customer</TableHead>
                  <TableHead className="text-zinc-400">Contact</TableHead>
                  <TableHead className="text-zinc-400">Company</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400 text-right">Total Spent</TableHead>
                  <TableHead className="text-zinc-400">Last Order</TableHead>
                  <TableHead className="text-zinc-400"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-zinc-400">
                      No customers found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer, index) => (
                    <motion.tr
                      key={customer.id}
                      className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback className="bg-orange-500/10 text-orange-500">
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-zinc-200">{customer.name}</p>
                            <p className="text-xs text-zinc-500">{customer.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-zinc-400">
                            <Mail className="mr-2 h-3 w-3" />
                            <span className="text-sm">Email</span>
                          </div>
                          <div className="flex items-center text-zinc-400 mt-1">
                            <Phone className="mr-2 h-3 w-3" />
                            <span className="text-sm">{customer.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-zinc-300">{customer.company}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            customer.status === "active"
                              ? "border-green-800 bg-green-950 text-green-400"
                              : "border-red-800 bg-red-950 text-red-400"
                          }
                        >
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-zinc-300">
                        ${customer.totalSpent.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-zinc-400">
                        {new Date(customer.lastOrder).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-400">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="text-red-400 hover:bg-red-950 hover:text-red-400 focus:bg-red-950 focus:text-red-400">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
