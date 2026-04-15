import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import type { Task } from './types/task'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Organize phone banking event',
      description: 'Coordinate volunteer calls for precinct 5',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Alex Chen',
      precinct: 'Precinct 5',
      dueDate: '2025-04-20',
      createdAt: '2025-04-01T10:00:00Z',
    },
    {
      id: '2',
      title: 'Create voter outreach materials',
      status: 'todo',
      priority: 'medium',
      dueDate: '2025-04-25',
      createdAt: '2025-04-01T10:15:00Z',
    },
  ])

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, task])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Campaign Tasks</h1>
          <p className="text-gray-600">Manage your organizing tasks and team assignments</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TaskList tasks={tasks} />
          </div>
          <div>
            <TaskForm onSubmit={handleAddTask} />
          </div>
        </div>
      </div>
    </div>
  )
}
