import React, { createContext, useReducer } from 'react';

export const TaskContext = createContext();

function reducer(state, action) {
  let newState;
  
  switch (action.type) {
    case "getInput":
      newState = {
        ...state,
        input: action.paylode
      };
      break;
    case "getDate":
      newState = {
        ...state,
        selectedDate: action.paylode
      };
      break;
    case "ADDTASK":
      if (state.input.trim() && state.selectedDate) {
        const taskCategory = getCategoryFromDate(state.selectedDate);
        newState = {
          ...state,
          tasks: [...state.tasks, { id: Date.now(), task: state.input, iscomplect: false, date: state.selectedDate, category: taskCategory }],
          input: "",
          selectedDate: ""
        };
        // Save to localStorage
        localStorage.setItem('todoTasks', JSON.stringify(newState.tasks));
        return newState;
      }
      return state;
    case "DELECT":
      newState = {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.paylode)
      };
      // Save to localStorage
      localStorage.setItem('todoTasks', JSON.stringify(newState.tasks));
      break;
    case 'COMPLECTTASK': {
      const completeTask = state.tasks.map((task) => {
        if (task.id === action.paylode) {
          return { ...task, iscomplect: true };
        }
        return task;
      });
      newState = {
        ...state,
        tasks: [...completeTask],
      };
      // Save to localStorage
      localStorage.setItem('todoTasks', JSON.stringify(newState.tasks));
      break;
    }
    default:
      return state;
  }
  
  return newState || state;
}

function getCategoryFromDate(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const selectedDate = new Date(dateString);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate.getTime() === today.getTime()) {
    return 'today';
  } else if (selectedDate.getTime() === tomorrow.getTime()) {
    return 'tomorrow';
  } else if (selectedDate > tomorrow && selectedDate < weekEnd) {
    return 'thisWeek';
  }
  // All other dates (past or future) are categorized as 'thisWeek' for display purposes
  return 'thisWeek';
}

export const TaskProvider = ({ children }) => {
  // Load tasks from localStorage or start with empty array
  const loadTasksFromStorage = () => {
    try {
      const savedTasks = localStorage.getItem('todoTasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  };

  const initialvalue = {
    tasks: loadTasksFromStorage(),
    input: "",
    selectedDate: ""
  };

  const [state, dispatch] = useReducer(reducer, initialvalue);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
