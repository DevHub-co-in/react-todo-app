import axios from "axios";
import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import style from "./Todo.module.css";

const ICON_SIZE = 28;

function Todo({ content, id, setTodos, isCompleted }) {
  const [isChecked, setIsChecked] = useState(isCompleted);

  const handleCheck = () => {
    axios
      .put(`${process.env.REACT_APP_SERVER_ROUTE}/todo/status/${id}`, {
        isCompleted: !isChecked,
      })
      .then((res) => {
        console.log(res);
        setTodos(res.data);
        setIsChecked(!isChecked);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_ROUTE}/todo/${id}`)
      .then((res) => {
        console.log(res);
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = () => {
    const newContent = prompt("Enter new content", content);
    if (newContent !== null) {
      axios
        .put(`${process.env.REACT_APP_SERVER_ROUTE}/todo/${id}`, {
          content: newContent,
        })
        .then((res) => {
          setTodos(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={style.todo_box}>
      <div className={style.todo}>
        <label className={style.input_control}>
          <input
            type="checkbox"
            value={isChecked}
            checked={isChecked}
            onChange={handleCheck}
          />
        </label>
        <div className={style.content}>{content}</div>
      </div>
      <div className={style.todo_button}>
        <span onClick={handleDelete}>
          <AiFillDelete size={ICON_SIZE} />
        </span>
        <span onClick={handleEdit}>
          <AiFillEdit size={ICON_SIZE} />
        </span>
      </div>
    </div>
  );
}

export default Todo;
