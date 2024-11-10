"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    const todoDate = new Date(todo.createdAt);
    return todoDate >= startDate && todoDate <= endDate;
  });

  const label = filteredTodos.map(todo => todo.label);
  const value = filteredTodos.map(todo => todo.value);
  const createdAt = todos
    .map(todo => new Date(todo.createdAt))
    .filter(date => date >= startDate && date <= endDate)
    .sort((a, b) => a.getTime() - b.getTime())
    .map(date => date.toISOString());

  const data = {
    labels: createdAt,
    datasets: [
      {
        label: 'Sample Data',
        data: value,
        fill: true,
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

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>グラフ表示</h1>
        <div>
          <div>
            <label>開始日: </label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date as Date)} />
          </div>
          <div>
            <label>終了日: </label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date as Date)} />
          </div>
        </div>
        <div>
          <Line data={data} options={options} width={800} height={300} />
        </div>
      </div>
    </>
  );
}
