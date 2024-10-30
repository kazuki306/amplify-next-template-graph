"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import { LineChart } from '@mui/x-charts/LineChart';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  const content = todos.map((todo) =>todo.content );
  const value = todos.map((todo) =>todo.value );
  const label = todos.map((todo) =>todo.label );

  const data = todos.map((todo) =>todo );
  
  alert(value)

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    //下記を追加
    //const todocontent = window.prompt("Todo content");
    //const todolabel = window.prompt("label");
    //const todovalue = window.prompt("value");
  　//以下は修正。
    client.models.Todo.create({
      content: window.prompt("Todo content"),
      //content: todocontent,
      //label: todolabel,
      //value: todovalue,
    });
  }

  return (
    <>
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}&nbsp;{todo.label}&nbsp;{todo.value}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>

    <LineChart
      xAxis={[{ data: content }]}
      series={[
        {
          data: value,
        },
      ]}
      width={500}
      height={300}
    />

    </>
  );

}
