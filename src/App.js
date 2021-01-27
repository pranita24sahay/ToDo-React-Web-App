import React from "react";
import "./App.css";
import TodoBanner from './TodoBanner'
import TodoList from './TodoList';
import TodoInput from './TodoInput';


function App() {
  const [todos, setTodos] = React.useState([]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <TodoBanner />
      <div className="container ">
        <div className="todo-list col-sm-3">
          Create List
          {todos.map((todo, index) => 
            (
              <TodoList key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo}/>
            )
          )}
          <TodoInput addTodo={addTodo} className=""/>
      </div></div>
    </div>
  );
}

export default App;