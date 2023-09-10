import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import axios from "axios";
import style from "./Todo.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function TodoContainer() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_ROUTE}/todo`, { content: todo })
      .then((res) => {
        setTodos([...todos, res.data]);
        setLoading(false);
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={style.mainContainer}>
      <div className={style.container}>
        <h1>
          Todo list: <i>React version</i>
        </h1>
        <div className={style.todo_container}>
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type="text"
            placeholder="Enter task"
            className={style.todo_input}
          />
          <button className={style.add_button} onClick={handleSubmit}>
            Add
          </button>
        </div>
        <div className={style.list_container}>
          {loading ? (
            <div className={style.loader}>
              <AiOutlineLoading3Quarters />
            </div>
          ) : (
            todos?.map((todo) => {
              return (
                <Todo
                  key={todo._id}
                  id={todo._id}
                  content={todo.content}
                  isCompleted={todo.isCompleted}
                  isLoading={setLoading}
                  setTodos={setTodos}
                />
              );
            })
          )}
        </div>
      </div>
      <div className={style.details}>
        <p>
          Built with ❤️ by the{" "}
          <span className={style.cta}>
            <a target="_blank" rel="noreferrer" href="https://devhub.co.in">
              Devhub
            </a>{" "}
            community
          </span>
        </p>
      </div>
    </div>
  );
}

export default TodoContainer;
