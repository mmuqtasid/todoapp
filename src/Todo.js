import React, { useState } from 'react';
import './Todo.css';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (inputText !== '') {
      setTodos([...todos, { text: inputText, isEditing: false }]);
      setInputText('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleEdit = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isEditing = !updatedTodos[index].isEditing;
    setEditIndex(index);
    setTodos(updatedTodos);
  };

  const saveTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isEditing = false;
    setEditIndex(null);
    setTodos(updatedTodos);
  };

  return (
    <div className='container'>
    <div className="App">
      <h1>ToDo App</h1>
      <input className='first'
        type="text"
        placeholder="Add a task"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.isEditing ? 'editing' : ''}>
            {todo.isEditing ? (
              <>
                <input 
                  type="text"
                  value={todo.text}
                  onChange={(e) => {
                    const updatedTodos = [...todos];
                    updatedTodos[index].text = e.target.value;
                    setTodos(updatedTodos);
                  }}
                />
                <button className="save-btn" onClick={() => saveTodo(index)}>
                  Save
                </button>
              </>
            ) : (
              <>
                {todo.text}
                <button className="edit-btn" onClick={() => toggleEdit(index)}>
                  Edit
                </button>
              </>
            )}
            <button onClick={() => removeTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Todo;
