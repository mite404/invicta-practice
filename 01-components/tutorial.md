# Module 1: React Components & TypeScript

Learn the fundamentals of React component design by building a task management UI. This module teaches types, composition, state, and form handling through five incremental challenges.

---

## Challenge 1: TypeScript Types

**File:** `src/types/task.ts`

**Concept:**

Types are the production brief for your code. They define the shape of your data before any component renders it. In TypeScript, you write contracts (interfaces, types, enums) that describe what data your components expect. This prevents bugs at compile time and makes your code self-documenting.

For campaign task management, we need to define the legal statuses, priorities, and the shape of a task record. These types will be imported and used across all our components.

### Type Basics

In TypeScript, there are several ways to define shapes:

- **Union types** (`type Status = 'todo' | 'done'`) — a value can be one of several literal strings
- **Enums** (`enum Status { Todo, Done }`) — named constants with values
- **Interfaces** (`interface Task { id: string }`) — object shapes with named fields

For this project, union types are preferred over enums because they're simpler and more commonly used in React codebases.

### Hint

Your `task.ts` file should export:
1. A `TaskStatus` union type with four valid status values
2. A `Priority` union type with three valid priority values
3. A `Task` interface with required and optional fields matching the shape used in App.tsx

Look at the initial task in App.tsx to see the shape you're targeting.

### Starting Code

```typescript
/**
 * Task domain types for Invicta campaign management
 */

// Status options for campaign tasks
export type TaskStatus = ___________

// Priority levels for task organization
export type Priority = ___________

// Main task interface
export interface Task {
  id: string
  title: string
  description?: string
  status: ___________
  priority: ___________
  assignee?: string      // organizer/volunteer name
  precinct?: string      // geographic unit
  dueDate?: string       // ISO date string
  createdAt: string
}
```

### Reflection

1. **Why does `description` have a `?` but `title` doesn't?** What does the optional marker communicate?
2. **What would happen if you removed the `export` keyword?** How would that affect other files?
3. **How would you describe the difference between `type TaskStatus` and `enum TaskStatus`?**

---

## Challenge 2: StatusBadge

**File:** `src/components/StatusBadge.tsx`

**Concept:**

A pure component is the simplest building block. It receives props and returns JSX—no internal state, no side effects, no surprises. Pure components are easy to test, reuse, and reason about.

`StatusBadge` is a pure display component. It receives a task status and returns a colored badge showing that status. The component's job is to map data to UI—nothing more.

### The Pure Component Pattern

A pure component:
- Takes props as input
- Returns JSX as output
- Does not call `setState` or hooks (except for memoization)
- Always returns the same output for the same input

This is the foundation of React. Master pure components first, then build state management on top.

### Hint

Define a mapping object inside the component. The object should have a key for each status, and each key should map to an object with:
- A human-readable label (e.g., "To Do", "In Progress")
- Tailwind background color class (e.g., "bg-red-100")
- Tailwind text color class (e.g., "text-red-800")

Use the `status` prop to look up the config, then render a `div` with the appropriate classes.

Example Tailwind color pairs (adjust as needed):
- Todo: `bg-gray-100`, `text-gray-800`
- In Progress: `bg-blue-100`, `text-blue-800`
- Complete: `bg-green-100`, `text-green-800`
- Blocked: `bg-red-100`, `text-red-800`

### Starting Code

```typescript
import type { TaskStatus } from '../types/task'

interface StatusBadgeProps {
  status: TaskStatus
}

/**
 * Pure display component: maps task status to a colored badge
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
  // TODO: Define a mapping object: status → { label, bgColor, textColor }
  const statusConfig = ___________

  // TODO: Return a div with Tailwind classes for the badge
  return <div>___________</div>
}
```

### Reflection

1. **Why is this component "pure"? What would make it impure?**
2. **How would you test a component like StatusBadge?**
3. **If you needed to reuse this badge color mapping in another component, how would you extract it?**

---

## Challenge 3: TaskCard

**File:** `src/components/TaskCard.tsx`

**Concept:**

Composition is how you build larger UIs from smaller pieces. A card is a container—it arranges smaller elements (like badges, text, metadata) into a cohesive unit. The card doesn't know how a badge works; it just uses it.

`TaskCard` composes `StatusBadge` and displays task metadata (title, description, priority, dates). This teaches you to:
- Import and use another component
- Conditional rendering (`{condition && <element />}`)
- Formatting data for display

### Composition Pattern

When building a composite component:
1. Identify the sub-components you need (e.g., `StatusBadge`)
2. Arrange them in a logical layout
3. Use conditional rendering for optional fields
4. Keep the component focused—don't combine display with logic

### Hint

The card should display:
1. Task title (always)
2. StatusBadge (always)
3. Description (only if present)
4. Priority, assignee, due date, precinct (only if present)

Use the conditional pattern: `{task.fieldName && <div>...</div>}`

For display, you might format the status from `in_progress` to `In Progress`. The most readable way is: `task.status.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')`, but you can also hardcode it or keep it as-is.

### Starting Code

```typescript
import type { Task } from '../types/task'
import StatusBadge from './StatusBadge'

interface TaskCardProps {
  task: Task
}

/**
 * Card component: displays a single task with status badge and metadata
 */
export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">___________</h3>
        <StatusBadge status={___________} />
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3">___________</p>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        {/* TODO: Display priority with a label */}
        <div>Priority: ___________</div>

        {/* TODO: Display assignee if present */}
        {___________ && <div>Assigned: {task.assignee}</div>}

        {/* TODO: Display due date if present */}
        {___________ && <div>Due: {task.dueDate}</div>}

        {/* TODO: Display precinct if present */}
        {___________ && <div>Precinct: {task.precinct}</div>}
      </div>
    </div>
  )
}
```

### Reflection

1. **What's the relationship between TaskCard and StatusBadge? How is it different from TaskCard and Task?**
2. **How does conditional rendering prevent errors? (e.g., why not just render `{task.assignee}`?)**
3. **If you added more metadata fields, when would this card become too complex?**

---

## Challenge 4: TaskList

**File:** `src/components/TaskList.tsx`

**Concept:**

Lists are one of the most common patterns in React: `.map()` over an array of data and render a component for each item. The critical detail is the `key` prop—it helps React track which items have changed, been added, or been removed.

`TaskList` displays multiple tasks. It also handles the empty state—when there are no tasks, show a friendly message instead of a blank card.

### The .map() Pattern

To render a list in React:

```javascript
{tasks.map(task => (
  <TaskCard key={task.id} task={task} />
))}
```

- The `key` prop must be **unique and stable**—usually the item's ID
- Never use the array index as a key (it breaks re-ordering)
- Always check for empty arrays before rendering

### Hint

1. Check if `tasks.length === 0`; if so, return an empty state div
2. Otherwise, return a container with a heading and a mapped list of `TaskCard` components
3. Use `task.id` as the key for each card
4. Pass the entire `task` object to `TaskCard`

### Starting Code

```typescript
import TaskCard from './TaskCard'
import type { Task } from '../types/task'

interface TaskListProps {
  tasks: Task[]
}

/**
 * List component: renders multiple tasks with empty state handling
 */
export default function TaskList({ tasks }: TaskListProps) {
  // TODO: Check if tasks array is empty and show empty state
  if (___________) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 text-lg">No tasks yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Tasks</h2>
      <div>
        {/* TODO: Map over tasks array, rendering TaskCard for each */}
        {___________.map((task) => (
          <TaskCard key={___________} task={___________} />
        ))}
      </div>
    </div>
  )
}
```

### Reflection

1. **Why is the `key` prop important? What would happen if you used the array index as the key?**
2. **What's the purpose of checking `tasks.length === 0`? Why not just render an empty div?**
3. **How would you add filtering (e.g., show only "high" priority tasks) to this list?**

---

## Challenge 5: TaskForm

**File:** `src/components/TaskForm.tsx`

**Concept:**

Controlled components use React state to manage form input values. Instead of the DOM owning the input (uncontrolled), React owns it. This gives you full control: validate before submit, prevent invalid input, or react to changes in real time.

`TaskForm` demonstrates the controlled input pattern. Each input (`<input>`, `<select>`, `<textarea>`) is bound to a state variable via `value` and `onChange`.

### The Controlled Component Pattern

For a controlled input:

```javascript
const [title, setTitle] = useState('')

<input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="..."
/>
```

- `value` is always synchronized with state
- `onChange` updates state when the user types
- You can validate, transform, or prevent updates

### Form Submission Flow

1. User fills fields (state updates on every keystroke)
2. User clicks "Create Task"
3. `handleSubmit` fires, prevents default form submission (`e.preventDefault()`)
4. Validate the data (e.g., title is not empty)
5. Call the parent's `onSubmit` callback with the form data
6. Clear the form (reset state to initial values)

### Hint

1. Implement `handleSubmit`:
   - Prevent default form submission
   - Check that `title` is not empty (show an alert if it is)
   - Call `onSubmit` with an object containing `{ title, status, priority, description }`
   - Only include `description` if it's not an empty string
   - Reset all state variables to their initial values

2. Wire up the controlled inputs:
   - `<input value={title} onChange={(e) => setTitle(e.target.value)}>`
   - `<select value={status} onChange={(e) => setStatus(e.target.value)}>`
   - `<textarea value={description} onChange={(e) => setDescription(e.target.value)}>`

### Starting Code

```typescript
import { useState } from 'react'
import type { Task } from '../types/task'

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void
}

/**
 * Form component: controlled inputs for creating a new task
 *
 * This component demonstrates controlled components and form handling in React.
 * Each input is controlled by state, allowing us to manage the form data
 * before submission and provide real-time validation feedback.
 */
export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'complete' | 'blocked'>('todo')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium')
  const [description, setDescription] = useState('')

  // TODO: Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: Validate that title is not empty
    if (___________) {
      alert('Title is required')
      return
    }

    // TODO: Call onSubmit with the form data
    onSubmit({
      title: ___________,
      status: ___________,
      priority: ___________,
      description: ___________ ? description : undefined,
    })

    // TODO: Reset form fields
    ___________
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">New Task</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Task Title *
        </label>
        <input
          id="title"
          type="text"
          value={___________}
          onChange={(e) => ___________}
          placeholder="Enter task title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          value={___________}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="complete">Complete</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          id="priority"
          value={___________}
          onChange={(e) => setPriority(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={___________}
          onChange={(e) => ___________}
          placeholder="Add task details..."
          rows={3}
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
  )
}
```

### Reflection

1. **Why do we check `description` before including it in the submission? What would happen if we always included it?**
2. **What's the difference between `<input>` in this controlled form and an uncontrolled `<input>` (where you'd use `ref` to read the value)?**
3. **How would you add real-time validation (e.g., highlight the title field in red if it's empty)?**

---

## Full Solutions

### ✓ Challenge 1: TypeScript Types

```typescript
export type TaskStatus = 'todo' | 'in_progress' | 'complete' | 'blocked'
export type Priority = 'high' | 'medium' | 'low'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: Priority
  assignee?: string
  precinct?: string
  dueDate?: string
  createdAt: string
}
```

**Key points:**
- Union types (`'todo' | 'in_progress'...`) constrain values at compile time
- The `?` marker makes a field optional (think: "might not exist")
- Interface fields are public by default; no visibility modifiers needed

---

### ✓ Challenge 2: StatusBadge

```typescript
export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    todo: { label: 'To Do', bgColor: 'bg-gray-100', textColor: 'text-gray-800' },
    in_progress: { label: 'In Progress', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
    complete: { label: 'Complete', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    blocked: { label: 'Blocked', bgColor: 'bg-red-100', textColor: 'text-red-800' },
  }

  const config = statusConfig[status]

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${config.bgColor} ${config.textColor}`}>
      {config.label}
    </span>
  )
}
```

**Key points:**
- Pure components are deterministic: same input → same output, always
- A mapping object decouples data from presentation
- Tailwind classes compose with template literals for dynamic styling

---

### ✓ Challenge 3: TaskCard

```typescript
export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <StatusBadge status={task.status} />
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        <div>Priority: {task.priority}</div>

        {task.assignee && <div>Assigned: {task.assignee}</div>}

        {task.dueDate && <div>Due: {task.dueDate}</div>}

        {task.precinct && <div>Precinct: {task.precinct}</div>}
      </div>
    </div>
  )
}
```

**Key points:**
- Composition lets you reuse components (StatusBadge) without knowing their internals
- Conditional rendering (`{field && <Element />}`) is the idiomatic React pattern for optional content
- Props are the contract between parent and child—fully typed for safety

---

### ✓ Challenge 4: TaskList

```typescript
export default function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 text-lg">No tasks yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Tasks</h2>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
```

**Key points:**
- Always render an empty state; don't leave the UI blank
- `key` must be unique and stable; `task.id` is the right choice here
- `.map()` is the idiomatic way to render lists; never use `for` loops in JSX

---

### ✓ Challenge 5: TaskForm

```typescript
export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'complete' | 'blocked'>('todo')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Title is required')
      return
    }

    onSubmit({
      title,
      status,
      priority,
      description: description.trim() ? description : undefined,
    })

    setTitle('')
    setStatus('todo')
    setPriority('medium')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">New Task</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Task Title *
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

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="complete">Complete</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add task details..."
          rows={3}
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
  )
}
```

**Key points:**
- Controlled components let React own form state, giving you full control
- Always call `e.preventDefault()` in form submission handlers
- Use `.trim()` to remove whitespace before validation
- Reset state after submission to clear the form for the next entry
- The `Omit<Task, 'id' | 'createdAt'>` type tells the parent what data the form provides (everything except what the parent generates)

---

## Next Steps

You've completed Module 1! You now understand:
- ✅ TypeScript types and interfaces
- ✅ Pure components and props
- ✅ Component composition
- ✅ List rendering with `.map()`
- ✅ Controlled form components

### Reset & Practice Again

```bash
git checkout src/
bun dev
```

Implement all 5 challenges again from scratch. Notice what you remember and what you need to look up—this is learning.

### Next Module

[→ Module 2: CRUD Operations](../02-crud/tutorial.md)

Focus on state coordination, filtering, async patterns, and optimistic updates. You'll build custom hooks that manage the task lifecycle beyond what App.tsx provides.
