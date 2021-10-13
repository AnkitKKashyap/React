import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const initialValues = {
    todo: "",
    todofile: "",
    imageFile: "",
   
  };
  const [todos, setTodos] = useState((initialValues) => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  
  const [todo,  setTodo] = useState(initialValues);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    // if(e.target.type !== 'file')
     
    // else{
      
    // }
    setTodo({...todo, [e.target.name]: e.target.value});
    //setTodo( e.target.value);
  }
  
  function handleEditInputChange(e) {
    //setCurrentTodo({ ...currentTodo, text: e.target.value});
    setCurrentTodo({ ...currentTodo, [e.target.name]: e.target.value});
    console.log(currentTodo);
  }

  function handleFormSubmit(e) {
     e.preventDefault();
    // const { name, value } = e.target;
  //  console.log([e.target.value]);
    if (todo !== "" ) {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.todo,
           file: todo.imageFile,
           type: todo.todofile
        }
      ]);
    }

    setTodo({});
   
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
      return todo.id === id ? updatedTodo : todo;
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
           <select name="editTodoFile"   onChange={handleEditInputChange}>
          <option value="mp3">MP3</option>
          <option value="img">IMAGE</option>
          <option value="vid">VIDEO</option>
        </select>
        <input
           type="file" 
           id="imageFile" 
           name='editimageFile' 
           value={currentTodo.imageUpload}
           onChange={handleEditInputChange} 
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
            value={todo.todo}
            onChange={handleInputChange}
          /> 
          <select name="todofile"    value={todo.todofile}  onChange={handleInputChange}>
          <option value="">Select</option>
          <option value="mp3">MP3</option>
          <option value="img">IMAGE</option>
          <option value="vid">VIDEO</option>
        </select>
        <input
          type="file" 
          id="imageFile"
          name='imageFile' 
          value={todo.imageFile}
          onChange={handleInputChange}
        />
       

          <button type="submit">Add</button>
        </form>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
         <span >  
         {todo.type === 'img' ? (<img style={{width: '60px'}} alt="" src={todo.file} />):('')}
           {todo.type === 'mp3' ? (<audio style={{width: '60px'}} src={todo.file}></audio>):('')}
           {todo.type === 'vid' ? (<video style={{width: '60px'}} src={todo.file}></video>):('')}
            {todo.text}
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