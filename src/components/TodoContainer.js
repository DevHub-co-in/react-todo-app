import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import axios from "axios";

function TodoContainer() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_ROUTE}/todo`, { content: todo })
      .then((res) => {
        setTodos([...todos, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    setTodo("");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ROUTE}/todo`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Todo list app</h1>
      <input
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        type="text"
        placeholder="Enter todo"
      />
      <button onClick={handleSubmit}>Add</button>
      <div className="list-container">
        {todos?.map((todo) => {
          return (
            <Todo
              key={todo._id}
              id={todo._id}
              content={todo.content}
              isCompleted={todo.isCompleted}
              setTodos={setTodos}
            />
          );
        })}
      </div>
      <div>
        <p>
          Built by{" "}
          <a target="_blank" href="https://varunkumawat.live">
            Varun
          </a>
        </p>
      </div>
    </div>
  );
}

export default TodoContainer;
