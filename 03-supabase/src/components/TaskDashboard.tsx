import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import type { Task } from '../types/database'

/**
 * Task Dashboard: wires Supabase hooks to UI
 *
 * This component:
 * - Uses the useTasks hook
 * - Displays loading/error states
 * - Provides UI for creating, updating, and deleting tasks
 * - Shows real-time updates as they happen
 */
export default function TaskDashboard() {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks()
  const [title, setTitle] = useState('')

  // TODO: Implement handleAddTask
  // 1. Prevent default if this is a form submission
  // 2. Validate title is not empty
  // 3. Call addTask() with the form data
  // 4. Reset the form
  // 5. Handle errors by showing an alert
  const handleAddTask = async (e: React.FormEvent) => {
    ___________
  }

  // TODO: Implement handleStatusChange
  // 1. Call updateTask with the new status
  // 2. Handle errors
  const handleStatusChange = async (id: string, newStatus: Task['status']) => {
    ___________
  }

  // TODO: Implement handleDeleteTask
  // 1. Call deleteTask
  // 2. Handle errors
  const handleDelete = async (id: string) => {
    ___________
  }

  // TODO: Show loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Loading tasks from Supabase...</p>
      </div>
    )
  }

  // TODO: Show error state
  if (error) {
    return (
      <div className="bg-red-50 rounded-lg shadow p-8">
        <p className="text-red-700 font-medium">Error loading tasks:</p>
        <p className="text-red-600 text-sm">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        {/* TODO: Display task list */}
        {tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No tasks yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Tasks ({tasks.length})</h2>
            </div>
            <div className="divide-y">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      {task.description && (
                        <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                      )}
                      <div className="flex gap-2 mt-2 text-xs text-gray-500">
                        <span>Priority: {task.priority}</span>
                        {task.assignee && <span>Assigned to: {task.assignee}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value as Task['status'])
                        }
                        className="text-xs px-2 py-1 border border-gray-300 rounded"
                      >
                        <option value="todo">Todo</option>
                        <option value="in_progress">In Progress</option>
                        <option value="complete">Complete</option>
                        <option value="blocked">Blocked</option>
                      </select>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar with add form */}
      <div>
        <form onSubmit={handleAddTask} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">New Task</h3>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  )
}
