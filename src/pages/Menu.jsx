import React, { useContext } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

const Menu = () => {
  const { state } = useContext(TaskContext);

  // Calculate task counts based on actual dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const todayCount = state.tasks.filter(t => {
    const taskDate = new Date(t.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  }).length;

  const tomorrowCount = state.tasks.filter(t => {
    const taskDate = new Date(t.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === tomorrow.getTime();
  }).length;

  const allTasksCount = state.tasks.length;

  return (
    <div className='manuBody'>
        <div className="title">
            <p>Menu</p>
            <button><AiOutlineMenu /></button>
        </div>
        <div className='nav-links-dev'>
            <Link to="/add-task" className='addTaskbtn'>+ Add New Task</Link>
            
            <div>
                <Link to="/today" className='menu-link'>
                    <div>
                        <p>Today</p>
                        <span>{todayCount}</span>
                    </div>
                </Link>
                <Link to="/tomorrow" className='menu-link'>
                    <div>
                        <p>Tomorrow</p>
                        <span>{tomorrowCount}</span>
                    </div>
                </Link>
                <Link to="/all-tasks" className='menu-link'>
                    <div>
                        <p>All Tasks</p>
                        <span>{allTasksCount}</span>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Menu
