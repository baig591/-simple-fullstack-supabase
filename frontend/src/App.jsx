import { useEffect, useState } from 'react'
import './App.css'
const API_URL = "http://52.53.242.194:5000";

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTasks = async () => {
    try {
      setError('')

      const response = await fetch(`${API_URL}/api/tasks`)

      if (!response.ok) {
        throw new Error('Failed to load tasks')
      }

      const data = await response.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const addTask = async (event) => {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    try {
      setError('')

      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: trimmedTitle }),
      })

      if (!response.ok) {
        throw new Error('Failed to create task')
      }

      const newTask = await response.json()

      setTasks((currentTasks) => [...currentTasks, newTask])
      setTitle('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main>
      <h1>Task Manager</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter a task"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      {error && <p>{error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
