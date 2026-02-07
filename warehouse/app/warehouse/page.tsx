"use client";

import { AppHeader } from "@/components/layouts/app-header";
import { LineChart } from "@/components/chart/line";
import { AreaChart } from "@/components/chart/area";
import { BarChart } from "@/components/chart/bar";
import { DoughnutChart } from "@/components/chart/doughnut";
import { StatCard } from "./components/stat-card";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Users,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function Warehouse() {
  return (
    <div>
      <AppHeader title={"Dashboard"} />
      <div className="mx-auto px-4 py-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard
            title="Total Revenue"
            value="$45,231"
            description="Total earnings this month"
            icon={DollarSign}
            trend={{ value: 20.1, isPositive: true }}
          />
          <StatCard
            title="Orders"
            value="2,350"
            description="Active orders"
            icon={ShoppingCart}
            trend={{ value: 15.3, isPositive: true }}
          />
          <StatCard
            title="Products"
            value="1,234"
            description="Total products in stock"
            icon={Package}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Growth"
            value="+12.5%"
            description="Compared to last month"
            icon={TrendingUp}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Customers"
            value="8,549"
            description="Registered customers"
            icon={Users}
            trend={{ value: 5.7, isPositive: true }}
          />
          <StatCard
            title="Low Stock"
            value="23"
            description="Products need restock"
            icon={AlertCircle}
            trend={{ value: 3.2, isPositive: false }}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <LineChart />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <DoughnutChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <BarChart />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <AreaChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Warehouse;
