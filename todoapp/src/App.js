import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo,  setTodo, setimageFile] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }
  function imageUpload(e) {
   console.log(e.target.value);
  }
  function typeSelect(e) {
    console.log(e.target.value);
   }
  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value,img:"" });
    console.log(currentTodo);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          img: "C:\fakepath\Mobile - Be Beautiful - HTML content 3.jpg"
        }
      ]);
    }

    setTodo("");
   
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo,todo.img === id ? updatedTodo : todo;
    });
     setIsEditing(false);
    setTodos(updatedItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  return (
    <div className="App">
      {isEditing ? (
       
        <form onSubmit={handleEditFormSubmit}>
        
          <h2>Edit Todo</h2>
        
          <label htmlFor="editTodo">Edit todo: </label>
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
           <select name="editTodoFile"  onSelect={typeSelect}>
          <option value="mp3">MP3</option>
          <option value="img">IMAGE</option>
          <option value="vid">VIDEO</option>
        </select>
        <input
           type="file" 
           id="imageFile" 
           name='editimageFile' 
           value={currentTodo.imageUpload}
           onChange={imageUpload} 
        />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
         <h2>Add Todo</h2>
         
          <label htmlFor="todo">Add todo: </label>
    
          <input
            name="todo"
            type="text"
            placeholder="Create a new todo"
            value={todo}
            onChange={handleInputChange}
          /> 
          <select name="TodoFile"  onSelect={typeSelect}>
          <option value="mp3">MP3</option>
          <option value="img">IMAGE</option>
          <option value="vid">VIDEO</option>
        </select>
        <input
          type="file" 
          id="imageFile"
          name='imageFile' 
          onChange={imageUpload} 
        />
       

          <button type="submit">Add</button>
        </form>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span > <img src={todo.img} />{todo.text}
           </span>
           <span style={{float:'right'}}> <button onClick={() => handleEditClick(todo)}>Edit</button>
            <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}