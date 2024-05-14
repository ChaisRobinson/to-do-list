import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), title: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  const startEditingTodo = (todo) => {
    setEditingTodo(todo.id);
    setEditingText(todo.title);
  };

  const saveEditedTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editingText } : todo
      )
    );
    setEditingTodo(null);
    setEditingText('');
  };

  return (
    <div className="App">
      <h1>Create Todo List</h1>
      <div className="todo-actions">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add task"
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteAllTodos}>Delete All</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {editingTodo === todo.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  todo.title
                )}
              </span>
            </div>
            <div >
              {editingTodo === todo.id ? (
                <button onClick={() => saveEditedTodo(todo.id)}>Save</button>
              ) : (
                <>
                  <button
                    onClick={() => startEditingTodo(todo)}
                    disabled={todo.completed}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    disabled={!todo.completed}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;