"use client";

import Link from 'next/link';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [1, 2, 3, 5, 8, 10],
  datasets: [
    {
      label: 'Sample Data',
      data: [2, 5.5, 2, 8.5, 1.5, 5],
      fill: true, // areaを有効にする
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: 'Line Chart Example',
    },
  },
};

const LineChartExample = () => {
  return <Line data={data} options={options} width={500} height={300} />;
};

export default LineChartExample;

