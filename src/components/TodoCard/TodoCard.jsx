import React, { useState } from "react";
import "./TodoCard.css";
import Button from "../UI/Button/Button";

const TodoCard = ({
  index,
  todo,
  handleEditTodo,
  handleDeleteTodo,
  handleCompleteTodo,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(todo);

  const handleSaveEdit = () => {
    handleEditTodo(index, editedValue);
    setEditMode(false);
  };

  return (
    <li className="container__todo-item">
      {editMode ? (
        <input
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          className="container__edit-input"
        />
      ) : (
        <span>{todo}</span>
      )}
      <div className="container__buttons">
        {editMode ? (
          <Button
            type="button"
            onClick={handleSaveEdit}
            text="Сохранить"
            className="container__save-button"
          />
        ) : (
          <Button
            type="button"
            onClick={() => setEditMode(true)}
            text="Редактировать"
            className="container__save-button"
          />
        )}
        {!editMode && (
          <Button
            type="button"
            onClick={() => handleDeleteTodo(index)}
            text="Удалить"
            className="container__delete-button"
          />
        )}
        {!editMode && (
          <Button
            type="button"
            onClick={() => handleCompleteTodo(index)}
            text="Выполнено"
            className="container__complete-button"
          />
        )}
      </div>
    </li>
  );
};

export default TodoCard;
