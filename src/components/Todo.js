import axios from "axios";
import React, { useState } from "react";

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
    <div>
      <input
        type="checkbox"
        value={isChecked}
        checked={isChecked}
        onChange={handleCheck}
      />
      {content}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default Todo;
