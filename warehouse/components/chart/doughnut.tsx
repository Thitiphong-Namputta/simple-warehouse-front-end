import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Order Status Distribution",
    },
  },
};

const labels = ["Delivered", "Shipped", "Processing", "Pending", "Confirmed", "Cancelled"];

export const data = {
  labels: labels,
  datasets: [
    {
      label: "Orders",
      data: labels.map(() => faker.number.int({ min: 10, max: 100 })),
      backgroundColor: [
        "rgba(34, 197, 94, 0.8)",
        "rgba(168, 85, 247, 0.8)",
        "rgba(99, 102, 241, 0.8)",
        "rgba(251, 191, 36, 0.8)",
        "rgba(59, 130, 246, 0.8)",
        "rgba(239, 68, 68, 0.8)",
      ],
      borderColor: [
        "rgba(34, 197, 94, 1)",
        "rgba(168, 85, 247, 1)",
        "rgba(99, 102, 241, 1)",
        "rgba(251, 191, 36, 1)",
        "rgba(59, 130, 246, 1)",
        "rgba(239, 68, 68, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

export function DoughnutChart() {
  return (
    <div className="w-full h-80">
      <Doughnut options={options} data={data} />
    </div>
  );
}
