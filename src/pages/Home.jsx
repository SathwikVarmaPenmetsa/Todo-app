import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const Home = ({ category }) => {
  const { state, dispatch } = useContext(TaskContext);

  function handleChange(e) {
    dispatch({ type: "getInput", paylode: e.target.value });
  }

  function handleDateChange(e) {
    dispatch({ type: "getDate", paylode: e.target.value });
  }

  function handleAddTask(){
    dispatch({type:"ADDTASK"})
  }

  function handleComplect(id){
    dispatch({type:'COMPLECTTASK',paylode:id})
  }

  function handleDelete(id){
    dispatch({type:'DELECT', paylode: id})
  }

  // Filter tasks based on category
  const getFilteredTasks = () => {
    if (!category || category === null) return state.tasks;
    
    if (category === 'add') return state.tasks;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);

    return state.tasks.filter(t => {
      const taskDate = new Date(t.date);
      taskDate.setHours(0, 0, 0, 0);
      
      if (category === 'today') {
        return taskDate.getTime() === today.getTime();
      }
      if (category === 'tomorrow') {
        return taskDate.getTime() === tomorrow.getTime();
      }
      if (category === 'thisWeek') {
        // Show tasks from day after tomorrow until the end of this week
        return taskDate > tomorrow && taskDate <= weekEnd;
      }
      return true;
    });
  };

  const filteredTasks = getFilteredTasks();
  
  const getPageTitle = () => {
    switch(category) {
      case 'today': return "Today's Tasks";
      case 'tomorrow': return "Tomorrow's Tasks";
      case 'allTasks': return "All Tasks";
      case 'add': return "Add New Task";
      default: return "My Tasks";
    }
  };

  const showAddForm = category === 'add';

  return (
    <div className="homebody">
      <div className="todo-container">
        <div className="todo-header">
          <h1>✓ {getPageTitle()}</h1>
          <p>Stay organized and get things done</p>
        </div>

        {showAddForm ? (
          <div className="add-task-form">
            <div className="input-section-with-date">
              <input
                type="text"
                id="todoInput"
                placeholder="Enter your task..."
                onChange={handleChange}
                value={state.input}
                autoFocus
              />
              <input
                type="date"
                id="todoDate"
                onChange={handleDateChange}
                value={state.selectedDate}
              />
              <button onClick={handleAddTask}>Add Task</button>
            </div>
            <p className="form-hint">💡 Enter task, select date, and click "Add Task" to save it!</p>
          </div>
        ) : (
          <>
            <div className="tasks-section">
              <h2>Tasks ({filteredTasks.length})</h2>
              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <p>No tasks yet. Add one to get started! 🚀</p>
                </div>
              ) : (
                <div className="tasks-list">
                  {filteredTasks.map((t) => {
                    const dateObj = new Date(t.date);
                    const formattedDate = dateObj.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: dateObj.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                    });
                    
                    return (
                      <div key={t.id} className="task-item">
                        <div className="task-content">
                          <span className="task-text" style={{
                            textDecoration: t.iscomplect ? 'line-through' : 'none',
                            color: t.iscomplect ? '#888' : '#000',
                            opacity: t.iscomplect ? 0.6 : 1
                          }}>
                            {t.task}
                          </span>
                          <span className="task-date">{formattedDate}</span>
                        </div>
                        <div className="task-buttons">
                          <button className="task-button complete-btn" onClick={() => handleComplect(t.id)}>
                            {t.iscomplect ? '✓ Done' : 'Mark Done'}
                          </button>
                          <button className="task-button delete-btn" onClick={() => handleDelete(t.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
