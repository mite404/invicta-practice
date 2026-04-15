# Module 2: CRUD Operations & State Management

Learn to build production-grade state management with custom hooks. This module teaches you to separate business logic (CRUD, filtering, sorting) from UI components using the hooks API.

---

## Challenge 1: useTaskManager — CRUD Operations

**File:** `src/hooks/useTaskManager.ts`

**Concept:**

A custom hook is a JavaScript function that uses other hooks. Unlike components, hooks are pure logic with no UI—they're production coordinators. They manage state and operations, making them reusable and testable.

`useTaskManager` is your first custom hook. It manages the entire task lifecycle: adding, updating, and deleting tasks. Components that use this hook don't need to know how tasks are stored; they just call the hook and use the returned functions.

### Custom Hooks Pattern

A custom hook:
- Is a function that uses React hooks (useState, useEffect, etc.)
- Always starts with `use` (convention)
- Returns an object or array of state + setters or functions
- Is reusable across multiple components
- Separates business logic from UI

Example:
```typescript
function useMyLogic() {
  const [value, setValue] = useState(0)
  const increment = () => setValue(v => v + 1)
  return { value, increment }
}

// In a component:
const { value, increment } = useMyLogic()
```

### Hint

Initialize state with sample tasks from App.tsx. Then implement:

1. **addTask**: Create a new task with a unique `id` and `createdAt` timestamp, then add it to the array
2. **updateTask**: Find the task by id, merge the updates, and return the new array
3. **deleteTask**: Filter out the task with the matching id

Use `setTasks` to update state. Common patterns:
- Add: `setTasks([...tasks, newItem])`
- Update: `setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t))`
- Delete: `setTasks(tasks.filter(t => t.id !== id))`

### Starting Code

```typescript
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

  // (Filtering/sorting logic comes in Challenge 2)
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
```

### Reflection

1. **Why is addTask passed a task without `id` and `createdAt`?** What does the hook add?
2. **What happens if you call `updateTask` with a non-existent id?** Is that a bug?
3. **How would you test this hook?** (Hint: hooks are just functions.)

---

## Challenge 2: Derived State — Filtering & Sorting

**File:** `src/hooks/useTaskManager.ts` (continued)

**Concept:**

Derived state is state that's computed from other state. Instead of storing filtered tasks separately, you compute them on the fly. The React hook `useMemo` memoizes the result—if the inputs haven't changed, it returns the cached result instead of recalculating.

This is critical for performance: filtering 1,000 tasks on every render is expensive. With `useMemo`, you only re-filter when tasks, filterStatus, or sortBy actually change.

### useMemo Pattern

```typescript
const filtered = useMemo(() => {
  return tasks.filter(t => t.status === status)
}, [tasks, status])  // Only recompute if tasks or status changed
```

The dependency array tells React: "If these values change, recalculate. Otherwise, use the cached value."

### Filtering & Sorting Logic

1. **Filter**: Remove tasks that don't match the selected status
   - If filterStatus is 'all', include everything
   - Otherwise, only include tasks with matching status

2. **Sort**:
   - `'created'`: Newest first (sort by createdAt descending)
   - `'priority'`: High → Medium → Low (define a priority order: `{ high: 3, medium: 2, low: 1 }`)
   - `'dueDate'`: Earliest date first (handle missing dueDate—put those at the end)

### Hint

```typescript
const filteredTasks = useMemo(() => {
  // TODO: Start with all tasks
  let result = tasks

  // TODO: Filter by status
  if (filterStatus !== 'all') {
    result = result.filter(t => t.status === filterStatus)
  }

  // TODO: Sort based on sortBy
  if (sortBy === 'created') {
    // Sort by createdAt descending (newest first)
  } else if (sortBy === 'priority') {
    // Sort by priority
  } else if (sortBy === 'dueDate') {
    // Sort by dueDate, with null dates at the end
  }

  return result
}, [tasks, filterStatus, sortBy])
```

### Reflection

1. **Why use `useMemo` instead of just filtering in render?** What's the performance difference?
2. **What happens if you forget `filterStatus` from the dependency array?** (Hint: stale data)
3. **How would you add a search filter (by task title)?** What would change?

---

## Challenge 3: useAsyncTask — Async Pattern

**File:** `src/hooks/useAsyncTask.ts`

**Concept:**

Async operations have three states: loading, success, and error. A common pattern is:

```
loading → data → done
loading → error → done
```

The hook `useAsyncTask` encapsulates this pattern. You pass it an async function, and it returns `{ data, loading, error, execute }`. Call `execute()` to run the async operation and automatically manage the state.

You'll use this in Module 3 for Supabase database calls.

### Async Flow

```typescript
const { data, loading, error, execute } = useAsyncTask(async () => {
  return await fetchData()
})

// In an event handler:
const handleFetch = async () => {
  await execute()  // Triggers loading state, then data or error
}
```

### Try/Catch Pattern

The hook should use try/catch to distinguish between success and error:

```typescript
try {
  const result = await asyncFn()
  setData(result)
  setError(null)
} catch (err) {
  setError(err)
  setData(null)
} finally {
  setLoading(false)
}
```

### Hint

Use `useCallback` to wrap the `execute` function. This prevents the function from being recreated on every render, which would cause unnecessary re-runs of useEffect in components using this hook.

The flow is:
1. Set `loading = true`, `error = null`
2. Call `asyncFn()` in a try block
3. On success: set `data`, clear `error`
4. On error: set `error`, clear `data`
5. Always: set `loading = false`

### Starting Code

```typescript
import { useState, useCallback } from 'react'

interface UseAsyncTaskState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useAsyncTask<T = void>(
  asyncFn: () => Promise<T>
): UseAsyncTaskState<T> & { execute: () => Promise<void> } {
  // TODO: Initialize state
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // TODO: Implement execute function using useCallback
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
```

### Reflection

1. **Why use `useCallback`?** What would happen if you removed it?
2. **What happens if you call `execute()` twice quickly?** Does the second call override the first?
3. **How would you cancel a pending async operation?** (Hint: AbortController)

---

## Challenge 4: Optimistic Updates (Stretch)

**File:** `src/hooks/useTaskManager.ts`

**Concept:**

Optimistic updates mean: update the UI *before* the server confirms the change. If the server fails, you can roll back. This makes apps feel instant instead of waiting for a response.

Example: You click "mark complete" and the UI immediately shows the task as complete. Meanwhile, the update request goes to the server. If the server fails, you revert the task to its previous state.

In Module 3 with a real backend, optimistic updates become essential for responsiveness.

### Pattern

```typescript
const handleDelete = async (id: string) => {
  const previous = tasks
  deleteTask(id)  // Optimistic: update UI immediately

  try {
    await api.deleteTask(id)  // Request goes to server
  } catch (error) {
    setTasks(previous)  // Rollback on error
  }
}
```

### Implementation (Optional)

If you want to try this now:

1. In `deleteTask`, immediately remove the task from state
2. In App.tsx's `handleDeleteTask`, add a try/catch:
   - If deletion "fails" (e.g., after a timeout), restore the task
3. In Module 3, this becomes critical when talking to a real database

### Reflection

1. **When is optimistic updating good UX?** When is it bad?
2. **What if the user deletes a task optimistically, then immediately undo?** How do you handle that?
3. **How would you show "pending" UI (e.g., a spinner) for optimistically updated tasks?**

---

## Full Solutions

### ✓ Challenge 1: useTaskManager — CRUD Operations

```typescript
export default function useTaskManager(): UseTaskManagerReturn {
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

  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'created' | 'priority' | 'dueDate'>('created')

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, task])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, ...updates } : t)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const filteredTasks = useMemo(() => {
    ___________  // Filled in Challenge 2
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
```

**Key points:**
- `addTask` receives a task without `id` and `createdAt`; the hook generates these
- `updateTask` uses `.map()` to find and update the target task
- `deleteTask` uses `.filter()` to remove the target task
- All three return a new array, triggering React to re-render

---

### ✓ Challenge 2: Derived State — Filtering & Sorting

```typescript
const filteredTasks = useMemo(() => {
  let result = tasks

  // Filter by status
  if (filterStatus !== 'all') {
    result = result.filter(t => t.status === filterStatus)
  }

  // Sort
  if (sortBy === 'created') {
    result = [...result].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } else if (sortBy === 'priority') {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    result = [...result].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
  } else if (sortBy === 'dueDate') {
    result = [...result].sort((a, b) => {
      if (!a.dueDate) return 1  // Tasks without due dates go to the end
      if (!b.dueDate) return -1
      return a.dueDate.localeCompare(b.dueDate)
    })
  }

  return result
}, [tasks, filterStatus, sortBy])
```

**Key points:**
- Always filter first, then sort
- Use `[...result].sort()` to avoid mutating the original array
- Priority order is subjective; adjust as needed
- Handle missing `dueDate` by putting them at the end
- The dependency array `[tasks, filterStatus, sortBy]` ensures the memo recomputes when any of these change

---

### ✓ Challenge 3: useAsyncTask — Async Pattern

```typescript
export function useAsyncTask<T = void>(
  asyncFn: () => Promise<T>
): UseAsyncTaskState<T> & { execute: () => Promise<void> } {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await asyncFn()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [asyncFn])

  return {
    data,
    loading,
    error,
    execute,
  }
}
```

**Key points:**
- `useCallback` prevents the `execute` function from being recreated every render
- `setError(null)` at the start clears previous errors
- `try/catch/finally` ensures loading is set to false regardless of outcome
- Generic type `<T>` makes the hook reusable for any async function

---

### ✓ Challenge 4: Optimistic Updates (Stretch)

Optimistic updates in `useTaskManager`:

```typescript
const deleteTask = (id: string) => {
  const previous = tasks
  setTasks(tasks.filter(t => t.id !== id))  // Optimistic update

  // In a real app, you'd call the server here and rollback on error
  // setTimeout(() => setTasks(previous), 1000)  // Simulate failure
}
```

**Key points:**
- Optimistic updates make apps feel instant
- Store the previous state before changing
- In production, pair with error handling to rollback
- Not all operations should be optimistic (destructive ones should wait for confirmation)

---

## What You've Learned

After completing Module 2, you understand:

- ✅ **Custom hooks**: Reusable business logic without UI
- ✅ **State coordination**: `addTask`, `updateTask`, `deleteTask` work together
- ✅ **Derived state**: `useMemo` for computed values without extra renders
- ✅ **Filtering & sorting**: Common list operations
- ✅ **Async patterns**: `loading`, `error`, and success states
- ✅ **Optimistic updates**: Feel-good UX patterns (preparation for backends)

## Next Steps

### Reset & Re-implement

```bash
git checkout src/hooks/
bun dev
```

Implement both hooks again from scratch. Notice which parts feel natural and which require thinking.

### Next Module

[→ Module 3: Supabase Integration](../03-supabase/tutorial.md)

Now you'll apply these patterns to a *real* backend. Supabase will provide the async operations, and your hooks will coordinate the loading/error states. Real-time subscriptions bring everything together.
