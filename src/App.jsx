import { useState } from 'react';
import './App.css';

function App() {
  // State to hold tasks, now with a 'priority' property
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn DSA', description: 'Focus on DP.', time: '2 hours', priority: 'high', completed: true },
    { id: 2, title: 'Socrates', description: 'Knowledge is highest virtue.', time: '3 hours', priority: 'medium', completed: false }
  ]);

  // State object to manage form inputs, with a default priority
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    priority: 'medium' // Default priority
  });

  // Handler to update the formData state for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handler specifically for updating the priority
  const handlePriorityChange = (priority) => {
    setFormData({ ...formData, priority: priority });
  };

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (formData.title.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      time: formData.time,
      priority: formData.priority, // Save the selected priority
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setFormData({ title: '', description: '', time: '', priority: 'medium' }); // Reset form
  };

  // Function to toggle the completed status
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Task Title..." className="task-input"/>
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description..." className="task-textarea"/>
        <input name="time" value={formData.time} onChange={handleInputChange} placeholder="Est. Time..." className="task-input"/>
        
        {/* --- PRIORITY SELECTOR --- */}
        <div className="priority-selector">
          <label>Priority:</label>
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

        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {/* --- DISPLAYED PRIORITY DOT --- */}
            <div className={`priority-dot ${task.priority}`}></div>

            <div className="task-details" onClick={() => handleToggleTask(task.id)}>
              <h3>{task.title}</h3>
              {task.description && <p>{task.description}</p>}
              {task.time && <small>Est: {task.time}</small>}
            </div>
            <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>&times;</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
