"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
//import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";


//import { LineChart } from '@mui/x-charts/LineChart';


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

  function createTodo() {
    //追加。
    const todocontent = window.prompt("内容を入力してください。");
    const todolabel = window.prompt("ラベルを入力してください。");
    const todovalue = window.prompt("値を入力してください。");
    client.models.Todo.create({
      //content: window.prompt("入力してください。"),
      content: todocontent,
      label: todolabel,
      value: todovalue,
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
    </>
  );

}
