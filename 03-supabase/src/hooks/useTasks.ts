import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Task } from '../types/database'

interface UseTasksReturn {
  tasks: Task[]
  loading: boolean
  error: Error | null
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

/**
 * Custom hook for Supabase task operations with real-time subscriptions
 *
 * This hook handles:
 * - Reading initial task data with useEffect
 * - Mutations (add, update, delete)
 * - Real-time subscriptions to database changes
 * - Loading and error states
 */
export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // TODO: Implement fetchTasks function
  // 1. Use supabase.from('tasks').select() to fetch all tasks
  // 2. Convert database rows to Task format (snake_case → camelCase)
  // 3. Set loading to false
  // 4. Handle errors
  const fetchTasks = async () => {
    ___________
  }

  // TODO: useEffect to fetch tasks on mount and set up real-time subscription
  // 1. Call fetchTasks()
  // 2. Subscribe to changes using supabase.channel('tasks').on('*', callback).subscribe()
  // 3. In the callback, handle INSERT/UPDATE/DELETE events
  // 4. Return cleanup function that unsubscribes
  useEffect(() => {
    ___________

    return () => {
      supabase.removeAllChannels()
    }
  }, [])

  // TODO: Implement addTask function
  // 1. Convert Task format to database format (camelCase → snake_case)
  // 2. Use supabase.from('tasks').insert()
  // 3. Throw error if insert fails
  const addTask = async (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    ___________
  }

  // TODO: Implement updateTask function
  // 1. Convert updates to database format
  // 2. Use supabase.from('tasks').update().eq('id', id)
  // 3. Throw error if update fails
  const updateTask = async (id: string, updates: Partial<Task>) => {
    ___________
  }

  // TODO: Implement deleteTask function
  // 1. Use supabase.from('tasks').delete().eq('id', id)
  // 2. Throw error if delete fails
  const deleteTask = async (id: string) => {
    ___________
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
  }
}
