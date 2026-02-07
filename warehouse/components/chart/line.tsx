"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Sales Trends",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value: number | string) {
          return '$' + value;
        }
      }
    }
  }
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const data = {
  labels,
  datasets: [
    {
      label: "Sales Revenue",
      data: labels.map(() => faker.number.int({ min: 15000, max: 45000 })),
      borderColor: "rgb(99, 102, 241)",
      backgroundColor: "rgba(99, 102, 241, 0.5)",
      tension: 0.4,
    },
    {
      label: "Target Revenue",
      data: labels.map(() => faker.number.int({ min: 20000, max: 40000 })),
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.5)",
      tension: 0.4,
      borderDash: [5, 5],
    },
  ],
};

export function LineChart() {
  return (
    <div className="w-full h-80">
      <Line options={options} data={data} />
    </div>
  );
}

