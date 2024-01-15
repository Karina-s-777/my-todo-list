import React, { useState, useEffect } from "react";
import "./TodoLists.css";
import TodoCard from "../TodoCard/TodoCard.jsx";
import Button from "../UI/Button/Button.jsx";

const TodoLists = () => {
  const [todoList, setTodoList] = useState([]);
  const [completedTodoList, setCompletedTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedTodoList = localStorage.getItem("todoList");
    if (savedTodoList) {
      setTodoList(JSON.parse(savedTodoList));
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodoList = [...todoList, inputValue];
      setTodoList(newTodoList);
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      setInputValue("");
    }
  };

  const handleEditTodo = (index, newValue) => {
    if (index in todoList) {
      const updatedTodoList = todoList.map((item, i) => {
        return i === index ? newValue : item;
      });
      setTodoList(updatedTodoList);
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    }
  };

  const handleDeleteTodo = (index) => {
    if (index in todoList) {
      const updatedTodoList = [...todoList];
      updatedTodoList.splice(index, 1);
      setTodoList(updatedTodoList);
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    }
  };

  const handleCompleteTodo = (index) => {
    const completedTodo = todoList[index];
    const updatedTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodoList);
    setCompletedTodoList((prevCompletedTodoList) => [
      ...prevCompletedTodoList,
      completedTodo,
    ]);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    localStorage.setItem(
      "completedTodoList",
      JSON.stringify([...completedTodoList, completedTodo])
    );
  };

  const renderTodoCards = () => {
    return todoList.map((todo, index) => (
      <TodoCard
        key={index}
        index={index}
        todo={todo}
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleCompleteTodo={handleCompleteTodo}
      />
    ));
  };

  return (
    <section className="container">
      <h1 className="container__todo-title">TODO List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="container__todo-input"
      />
      <Button
        type="button"
        className="container__todo-button"
        onClick={handleAddTodo}
        text="Добавить"
      />
      <ul className="container__items">{renderTodoCards()}</ul>
    </section>
  );
};

export default TodoLists;
