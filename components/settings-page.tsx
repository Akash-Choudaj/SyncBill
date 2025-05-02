"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-zinc-400">Manage your application settings and preferences.</p>
      </motion.div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-zinc-800 text-zinc-400">
          <TabsTrigger value="general" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white">
            General
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white">
            Billing
          </TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white">
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-zinc-100">General Settings</CardTitle>
              <CardDescription className="text-zinc-400">Configure general application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    defaultValue="Acme Inc"
                    className="bg-zinc-800 border-zinc-700 text-white mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="asia-kolkata">
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white mt-1">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="asia-kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                      <SelectItem value="america-new_york">America/New_York (GMT-4:00)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (GMT+1:00)</SelectItem>
                      <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9:00)</SelectItem>
                      <SelectItem value="australia-sydney">Australia/Sydney (GMT+10:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white mt-1">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="inr">
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white mt-1">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="gbp">British Pound (£)</SelectItem>
                      <SelectItem value="jpy">Japanese Yen (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-zinc-100">Appearance Settings</CardTitle>
              <CardDescription className="text-zinc-400">
                Customize the look and feel of your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Dark Mode</h3>
                    <p className="text-xs text-zinc-400">Use dark theme throughout the application.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="dark-mode" defaultChecked />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Compact View</h3>
                    <p className="text-xs text-zinc-400">Reduce spacing to show more content.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="compact-view" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <Select defaultValue="orange">
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white mt-1">
                      <SelectValue placeholder="Select accent color" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="pink">Pink</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white mt-1">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-zinc-100">Billing Settings</CardTitle>
              <CardDescription className="text-zinc-400">
                Manage your billing preferences and payment methods.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Current Plan</h3>
                  <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-white">Professional Plan</p>
                        <p className="text-xs text-zinc-400">₹2,499/month • Renews on May 15, 2023</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                      >
                        Upgrade
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Payment Method</h3>
                  <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-zinc-700 p-2 rounded mr-3">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect width="24" height="24" rx="4" fill="#1434CB" />
                            <path d="M9.5 15.5H14.5L15.5 9.5H8.5L9.5 15.5Z" fill="#FF5F00" />
                            <path d="M9.5 15.5H14.5L15.5 9.5H8.5L9.5 15.5Z" fill="#FF5F00" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-white">•••• •••• •••• 4242</p>
                          <p className="text-xs text-zinc-400">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Billing Address</h3>
                  <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-white">Acme Inc</p>
                        <p className="text-xs text-zinc-400">123 Business Street</p>
                        <p className="text-xs text-zinc-400">Mumbai, Maharashtra 400001</p>
                        <p className="text-xs text-zinc-400">India</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-zinc-100">Advanced Settings</CardTitle>
              <CardDescription className="text-zinc-400">Configure advanced application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Enable API Access</h3>
                    <p className="text-xs text-zinc-400">Allow external applications to access your data via API.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="api-access" defaultChecked />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    <p className="text-xs text-zinc-400">Add an extra layer of security to your account.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="two-factor" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Data Backup</h3>
                    <p className="text-xs text-zinc-400">Automatically backup your data daily.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="data-backup" defaultChecked />
                  </div>
                </div>

                <div>
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue="30"
                    min="5"
                    max="120"
                    className="bg-zinc-800 border-zinc-700 text-white mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
