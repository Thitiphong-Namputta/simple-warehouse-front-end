"use client";

import { AppHeader } from "@/components/layouts/app-header";
import { AreaChart } from "@/components/chart/area";
import { BarChart } from "@/components/chart/bar";
import { LineChart } from "@/components/chart/line";
import { DoughnutChart } from "@/components/chart/doughnut";
import { SectionCards } from "../section-cards";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function InventorySummary() {
  return (
    <div>
      <AppHeader title="Inventory" />
      <div className="mx-auto px-4 py-4 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/warehouse/inventory">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Summary</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="@container/main flex flex-1 flex-col">
          <SectionCards />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <AreaChart />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <BarChart />
            </CardContent>
          </Card>
        </div>

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
      </div>
    </div>
  );
}
