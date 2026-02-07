import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: "Top Selling Products",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    }
  }
};

const labels = ["Product A", "Product B", "Product C", "Product D", "Product E", "Product F"];

export const data = {
  labels,
  datasets: [
    {
      label: "Units Sold",
      data: labels.map(() => faker.number.int({ min: 100, max: 800 })),
      backgroundColor: "rgba(59, 130, 246, 0.8)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 1,
    },
  ],
};

export function BarChart() {
  return (
    <div className="w-full h-80">
      <Bar options={options} data={data} />
    </div>
  );
}
