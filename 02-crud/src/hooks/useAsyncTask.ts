import { useState, useCallback } from 'react'

interface UseAsyncTaskState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * Generic hook for handling async operations with loading and error states
 *
 * This hook abstracts the common pattern of:
 * - Setting loading to true
 * - Running an async function
 * - Setting data or error based on the result
 * - Setting loading to false
 *
 * You'll use this in Module 3 for Supabase operations.
 */
export function useAsyncTask<T = void>(
  asyncFn: () => Promise<T>
): UseAsyncTaskState<T> & { execute: () => Promise<void> } {
  // TODO: Initialize state: data (null), loading (false), error (null)
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // TODO: Implement execute function using useCallback
  // 1. Set loading to true
  // 2. Set error to null
  // 3. Try to call asyncFn()
  // 4. If success, set data and clear error
  // 5. If error, set error and clear data
  // 6. Always set loading to false at the end
  const execute = useCallback(async () => {
    ___________
  }, [asyncFn])

  return {
    data,
    loading,
    error,
    execute,
  }
}
