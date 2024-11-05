"use client";

import Link from 'next/link';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import * as React from 'react';
import { Radar } from 'react-chartjs-2';

function ChartJsRader() {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  );

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: '# of Votes',
        data: [80, 50, 30, 40, 100, 20],
        backgroundColor: 'rgba(96, 109, 194, 0.2)',
        borderColor: 'rgba(96, 109, 194, 1)',
        borderWidth: 1,
      },
    ],
  };
  return <Radar data={data} />;
}

export default ChartJsRader;
