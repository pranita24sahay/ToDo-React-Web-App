import React from 'react';

function TodoInput({ addTodo }) {
    const [value, setValue] = React.useState("");
    const [inputSize, setSize] = React.useState("50")
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };
    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={value}
                    size={inputSize}
                    placeholder="Add a new Task"
                    onChange={e => setValue(e.target.value)}
                />
            </form>
      </div>
    );
  }

export default TodoInput;