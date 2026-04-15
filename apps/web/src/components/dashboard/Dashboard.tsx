"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "./Header";
import { UsersTab } from "./UsersTab";
import { StaffTab } from "./StaffTab";
import { ProductsTab } from "./ProductsTab";

const STATS = [
  { label: "Total Customers", value: "3", color: "text-blue-600" },
  { label: "Staff Members", value: "3", color: "text-green-600" },
  { label: "Products", value: "3", color: "text-purple-600" },
];

export function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="customers">
          <TabsList className="mb-4">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="customers">
            <UsersTab />
          </TabsContent>

          <TabsContent value="staff">
            <StaffTab />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTab />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t bg-white px-6 py-3 text-center text-xs text-gray-400">
        BizDesk &copy; {new Date().getFullYear()} — Business Management Dashboard
      </footer>
    </div>
  );
}
