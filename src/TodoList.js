import React from 'react';

function TodoList({index, todo, completeTodo, removeTodo }) 
{
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
      {todo.text}
      <div>
        <button id="complete-button" onClick={() => completeTodo(index)}>Complete</button>
        <button id="close-button" onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

export default TodoList;
