// ----------------------------------------
// 1. IMPORTS
// ----------------------------------------

// This line imports the 'useState' function (called a "Hook") from the React library.
// 'useState' is the most important tool for giving a component memory.
import { useState } from 'react';

// This line imports the stylesheet. Without this, your component would have no custom styling.
import './App.css';

// ----------------------------------------
// 2. COMPONENT DEFINITION
// ----------------------------------------

// This defines your main component. A component in React is just a JavaScript function
// that returns some JSX (which looks like HTML).
function App() {

  // ----------------------------------------
  // 3. STATE (The Component's Memory)
  // ----------------------------------------

  // Here we initialize the state for our list of tasks.
  // `tasks` is the variable that holds the current array of task objects.
  // `setTasks` is the SPECIAL function we MUST use to update the list.
  // The initial value is an array with two example tasks.
const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn DSA', description: 'Focus on DP.', time: '2 hours', priority: 'high', completed: true },
    { id: 2, title: 'Socrates', description: 'Knowledge is highest virtue.', time: '3 hours', priority: 'medium', completed: false }
  ]);

  // Here we initialize the state for our form data.
  // `formData` is an object that holds the current text in all the input fields.
  // `setFormData` is the SPECIAL function for updating it.
  // We give it a default priority of 'medium'.
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    priority: 'medium'
  });

  // ----------------------------------------
  // 4. HELPER FUNCTIONS (Event Handlers)
  // ----------------------------------------

  // This function is called every time you type in the title, description, or time fields.
  const handleInputChange = (e) => {
    // `e.target` is the input element itself.
    // `name` is its name attribute ('title', 'description', etc.) and `value` is what you typed.
    const { name, value } = e.target;
    // We update the formData, keeping all old values (`...formData`) and overwriting the one that changed.
    setFormData({ ...formData, [name]: value });
  };
  
  // This function is called ONLY when you click on one of the priority dots in the form.
  const handlePriorityChange = (priority) => {
    // It updates the `priority` property in our formData state.
    setFormData({ ...formData, priority: priority });
  };

  // This function runs when you click the "Add Task" button.
  const handleAddTask = () => {
    // First, we check if the title is empty. If so, we do nothing.
    if (formData.title.trim() === '') return;

    // We create a new task object using the current data from the form.
    const newTask = {
      id: Date.now(), // A unique ID based on the current time
      title: formData.title,
      description: formData.description,
      time: formData.time,
      priority: formData.priority,
      completed: false, // New tasks are never completed by default
    };

    // We update the main tasks list by creating a new array.
    // `...tasks` copies all the old tasks, and `, newTask` adds the new one at the end.
    setTasks([...tasks, newTask]);
    
    // Finally, we reset the form fields back to their empty/default state for the next entry.
    setFormData({ title: '', description: '', time: '', priority: 'medium' });
  };

  // This function runs when you click on the text/details of a task.
  const handleToggleTask = (id) => {
    // We update the tasks list by mapping over the old one.
    setTasks(
      tasks.map(task => 
        // For each task, we check if its ID matches the one we clicked.
        // If it does, we create a new task object with all the same properties (`...task`),
        // but we FLIP the `completed` value (`!task.completed`).
        // If the ID doesn't match, we just return the task unchanged.
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // This function runs when you click the '×' delete button.
  const handleDeleteTask = (id) => {
    // We update the tasks list by filtering it.
    // The `.filter()` method creates a new array that only includes items
    // that return `true` from the condition. Here, we keep every task
    // whose ID does NOT match the one we want to delete.
    setTasks(tasks.filter(task => task.id !== id));
  };


  // ----------------------------------------
  // 5. JSX (What the component renders)
  // ----------------------------------------
  
  // The `return` statement contains the JSX that describes what the component looks like.
  return (
    // This is the main container for the whole app. The class `app-container` is used by App.css.
    <div className="app-container">
      <h1>To-Do List</h1>
      
      {/* This container holds all the input fields and the button. */}
      <div className="input-container">
        
        {/* The `value` is tied to our state, and `onChange` calls our function every time you type. */}
        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Task Title..." className="task-input"/>
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description..." className="task-textarea"/>
        <input name="time" value={formData.time} onChange={handleInputChange} placeholder="Est. Time..." className="task-input"/>
        
        {/* This is the container for the priority dots in the form. */}
        <div className="priority-selector">
          <label>Priority:</label>
          
          {/* Each dot is a `div`. When clicked, it calls `handlePriorityChange`. */}
          {/* Its `className` is conditional: it gets the `selected` class if its priority matches the one in our formData state. */}
          <div 
            className={`priority-dot-input high ${formData.priority === 'high' ? 'selected' : ''}`}
            onClick={() => handlePriorityChange('high')}
          ></div>
          <div 
            className={`priority-dot-input medium ${formData.priority === 'medium' ? 'selected' : ''}`}
            onClick={() => handlePriorityChange('medium')}
          ></div>
          <div 
            className={`priority-dot-input low ${formData.priority === 'low' ? 'selected' : ''}`}
            onClick={() => handlePriorityChange('low')}
          ></div>
        </div>

        {/* This button calls `handleAddTask` when clicked. */}
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* This is the unordered list that will display our tasks. */}
      <ul className="task-list">
        
        {/* Here we use `.map()` to loop through our `tasks` state and create an `<li>` for each one. */}
        {tasks.map(task => (
          
          // `key` is a special prop React needs for lists to be efficient.
          // >>> THIS IS THE LINE YOU ASKED ABOUT! <<<
          // If `task.completed` is `true`, this `<li>` gets a class of "completed".
          // The CSS file sees this "completed" class and applies the `text-decoration: line-through` style.
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            
            {/* This `div` is the colored dot shown next to each task in the list. */}
            {/* Its class will be "priority-dot high", "priority-dot medium", etc., which the CSS uses to set the color. */}
            <div className={`priority-dot ${task.priority}`}></div>

            {/* This `div` holds the task's text. When clicked, it toggles the completion status. */}
            <div className="task-details" onClick={() => handleToggleTask(task.id)}>
              <h3>{task.title}</h3>
              {/* These lines only render the description or time if they actually exist. */}
              {task.description && <p>{task.description}</p>}
              {task.time && <small>Est: {task.time}</small>}
            </div>

            {/* This is the delete button. When clicked, it calls `handleDeleteTask`. */}
            <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>&times;</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----------------------------------------
// 6. EXPORT
// ----------------------------------------

// This line makes the `App` component available to be imported by other files (like main.jsx).
export default App;
