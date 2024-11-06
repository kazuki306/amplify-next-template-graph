"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
//import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

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

Amplify.configure(outputs);

const client = generateClient<Schema>();


export default function App() {

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  //alert(JSON.stringify(todos))
  const label = todos.map(todos => todos.label);
  const value = todos.map(todos => todos.value);

  const data = {
    //labels: [1, 2, 3, 5, 8, 10],
    labels: label,
    datasets: [
      {
        label: 'Sample Data',
        //data: [2, 5.5, 2, 8.5, 1.5, 5],
        data: value,
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

  return(
    <>
      <Line data={data} options={options} width={300} height={200} />;
    </>
  );

}
