import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskControls from './components/TaskControls'
import useTaskManager from './hooks/useTaskManager'
import type { Task } from './types/task'

export default function App() {
  const {
    tasks,
    filteredTasks,
    filterStatus,
    sortBy,
    setFilterStatus,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
  } = useTaskManager()

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(newTask)
  }

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    updateTask(id, updates)
  }

  const handleDeleteTask = (id: string) => {
    deleteTask(id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Campaign Dashboard</h1>
          <p className="text-gray-600">Manage tasks, filter by status, and organize your team</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <TaskControls
              filterStatus={filterStatus}
              sortBy={sortBy}
              onFilterChange={setFilterStatus}
              onSortChange={setSortBy}
              taskCount={filteredTasks.length}
            />
            <TaskList
              tasks={filteredTasks}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          </div>
          <div>
            <TaskForm onSubmit={handleAddTask} />
            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Stats</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Total tasks: <span className="font-bold text-gray-900">{tasks.length}</span></p>
                <p>Todo: <span className="font-bold text-gray-900">{tasks.filter(t => t.status === 'todo').length}</span></p>
                <p>In Progress: <span className="font-bold text-gray-900">{tasks.filter(t => t.status === 'in_progress').length}</span></p>
                <p>Complete: <span className="font-bold text-gray-900">{tasks.filter(t => t.status === 'complete').length}</span></p>
                <p>Blocked: <span className="font-bold text-gray-900">{tasks.filter(t => t.status === 'blocked').length}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
