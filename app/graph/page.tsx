"use client"; // これを追加

import Link from 'next/link';

// pages/LineChart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: {
        January: 65,
        February: 59,
        March: 80,
        April: 81,
        May: 56,
        June: 55,
        July: 40,
      },
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

export default function LineChart() {
  return (
    <div>
      <h2>Line Chart Example</h2>
      <Line data={data} />
    </div>
  );
}
