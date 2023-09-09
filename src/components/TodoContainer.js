import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import axios from "axios";
import style from './Todo.module.css'

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
    <div className={style.mainContainer} >
      <div className={style.container}>
      <h1>Todo list app</h1>
      <div className={style.todo_container}>
      <input
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        type="text"
        placeholder="Enter todo"
        className={style.todo_input}
      />
      <button className={style.add_button} onClick={handleSubmit}>Add</button>
      </div>
      <div className={style.list_container}>
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
      </div>
      <div className={style.details}>
        <p>
          Built by{" "}
          <span className={style.cta}>
          <a target="_blank" rel="noreferrer" href="https://varunkumawat.live">
            Devhub
          </a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default TodoContainer;
