import { useState, useMemo } from 'react'
import type { Task, TaskStatus } from '../types/task'

interface UseTaskManagerReturn {
  tasks: Task[]
  filteredTasks: Task[]
  filterStatus: TaskStatus | 'all'
  sortBy: 'created' | 'priority' | 'dueDate'
  setFilterStatus: (status: TaskStatus | 'all') => void
  setSortBy: (sort: 'created' | 'priority' | 'dueDate') => void
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
}

/**
 * Custom hook for managing task CRUD operations and filtering
 *
 * This hook encapsulates all task management logic, separating it from UI components.
 * Components that use this hook don't need to know HOW tasks are stored or filtered,
 * only THAT they can be filtered and sorted.
 */
export default function useTaskManager(): UseTaskManagerReturn {
  // TODO: Initialize tasks state with some sample data
  // Use the same initial tasks from App.tsx in module 1
  const [tasks, setTasks] = useState<Task[]>(___________)

  // TODO: Initialize filter and sort state
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'created' | 'priority' | 'dueDate'>('created')

  // TODO: Implement addTask function
  const addTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    ___________
  }

  // TODO: Implement updateTask function
  const updateTask = (id: string, updates: Partial<Task>) => {
    ___________
  }

  // TODO: Implement deleteTask function
  const deleteTask = (id: string) => {
    ___________
  }

  // TODO: Implement filtered and sorted tasks using useMemo
  // 1. Filter tasks by status (or show all if filterStatus is 'all')
  // 2. Sort by created date (newest first), priority (high→medium→low), or dueDate
  // Remember to depend on [tasks, filterStatus, sortBy]
  const filteredTasks = useMemo(() => {
    ___________
  }, [tasks, filterStatus, sortBy])

  return {
    tasks,
    filteredTasks,
    filterStatus,
    sortBy,
    setFilterStatus,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
  }
}
