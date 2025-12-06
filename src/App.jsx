import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Menu from './pages/Menu'
import { TaskProvider } from './context/TaskContext'

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className='mainpages'>
          <Menu />
          <Routes>
            <Route path="/" element={<Home category="add" />} />
            <Route path="/today" element={<Home category="today" />} />
            <Route path="/tomorrow" element={<Home category="tomorrow" />} />
            <Route path="/all-tasks" element={<Home category="allTasks" />} />
            <Route path="/add-task" element={<Home category="add" />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  )
}

export default App
