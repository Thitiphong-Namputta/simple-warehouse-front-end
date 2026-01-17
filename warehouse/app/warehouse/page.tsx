"use client";

import { AppHeader } from "@/components/layouts/app-header";
import { LineChart } from "@/components/chart/line";
import { AreaChart } from "@/components/chart/area";
import { DoughnutChart } from "@/components/chart/doughnut";

function Warehouse() {
  return (
    <div>
      <AppHeader title={"Dashboard"} />
      <LineChart />
      <AreaChart />
      <DoughnutChart />
    </div>
  );
}

export default Warehouse;
