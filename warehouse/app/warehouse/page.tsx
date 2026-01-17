"use client";

import { AppHeader } from "@/components/layouts/app-header";
import { LineChart } from "@/components/chart/line";
import { AreaChart } from "@/components/chart/area";
import { BarChart } from "@/components/chart/bar";
import { DoughnutChart } from "@/components/chart/doughnut";

function Warehouse() {
  return (
    <div>
      <AppHeader title={"Dashboard"} />
      <div className="grid grid-cols-2 gap-2">
        <div className=" justify-self-center">
          <LineChart />
        </div>
        <div className=" justify-self-center">
          <AreaChart />
        </div>
        <div className=" justify-self-center">
          <BarChart />
        </div>
        <div className=" justify-self-center">
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
}

export default Warehouse;
