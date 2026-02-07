import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
  Filler,
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
      text: "Inventory Levels Over Time",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    }
  }
};

const labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Stock Level",
      data: labels.map(() => faker.number.int({ min: 500, max: 2000 })),
      borderColor: "rgb(168, 85, 247)",
      backgroundColor: "rgba(168, 85, 247, 0.3)",
      tension: 0.4,
    },
  ],
};

export function AreaChart() {
  return (
    <div className="w-full h-80">
      <Line options={options} data={data} />
    </div>
  );
}
