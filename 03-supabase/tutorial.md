# Module 3: Supabase Integration & Real-time

Learn to build production-grade backend-connected applications. This module teaches you to integrate a PostgreSQL database via Supabase, perform CRUD operations, and subscribe to real-time changes.

---

## Prerequisites

Before starting this module:

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Create a `tasks` table** with these columns:
   ```
   - id (UUID, primary key, auto-generated)
   - created_at (Timestamp with time zone, default now())
   - title (Text, required)
   - description (Text, nullable)
   - status (Text, default 'todo')
   - priority (Text, default 'medium')
   - assignee (Text, nullable)
   - precinct (Text, nullable)
   - due_date (Date, nullable)
   ```
3. **Enable Row Level Security (RLS)** but add a policy allowing anonymous access (for this tutorial):
   ```sql
   CREATE POLICY "Allow public access" ON tasks FOR ALL USING (true)
   ```
4. **Copy your credentials** from Supabase Dashboard → Settings → API → URL and anon key
5. **Fill in `.env.local`** with your credentials

---

## Challenge 1: Supabase Client Setup

**File:** `src/lib/supabase.ts`

**Concept:**

The Supabase client is your gateway to the database. It handles authentication, request signing, and error handling. You create it once and reuse it throughout your app.

Environment variables are how you keep secrets (API keys) out of your code. In development, you use `.env.local` (not committed to git). In production, your CI/CD pipeline injects secrets from a secure vault.

### Environment Variables in Vite

In Vite, environment variables must start with `VITE_` to be accessible in the browser:

```javascript
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

Never expose your service role key in the browser—only the anon key.

### Hint

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Check .env.local')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
```

The `<Database>` type tells TypeScript about your schema.

### Starting Code

```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

// TODO: Get environment variables and validate they exist
const supabaseUrl = ___________
const supabaseKey = ___________

// TODO: Check that both environment variables are set, or throw an error
if (!supabaseUrl || !supabaseKey) {
  ___________
}

// TODO: Create and export the Supabase client
export const supabase = ___________
```

### Reflection

1. **Why does the URL need to start with `VITE_`?** What happens if you remove it?
2. **Why throw an error if credentials are missing?** What's the alternative?
3. **What's the difference between the anon key and service role key?** When would you use each?

---

## Challenge 2: Database Types

**File:** `src/types/database.ts`

**Concept:**

Database types describe the shape of your data in the database. Supabase can auto-generate these types, but for this tutorial, we've provided a skeleton.

Types help you catch errors:
- Using the wrong column name? TypeScript tells you.
- Inserting a string where a number is required? TypeScript tells you.

### Database vs. App Types

There's a distinction:
- **Database types**: How data is stored (snake_case, database field names)
- **App types**: How you use data in React (camelCase, friendly names)

You'll convert between them in your hooks.

### Hint

The `Database` interface describes:
1. **Tables**: What tables exist and their structure
2. **Rows**: What data you get back from SELECT
3. **Insert**: What you're allowed to insert (some fields optional, like auto-generated IDs)
4. **Update**: What you can update (all fields optional)

Types are already provided in the starter file. Study the structure—you'll use it in Challenge 3.

### Reflection

1. **Why are all fields in `Insert` optional except `title`?** What makes a field required?
2. **What's the difference between `Row`, `Insert`, and `Update`?** When would you use each?
3. **How would you add validation (e.g., "priority must be one of ...")?** Is that a type job or a data job?

---

## Challenge 3: Read — useTasks Hook

**File:** `src/hooks/useTasks.ts`

**Concept:**

`useTasks` fetches data from Supabase and keeps your app in sync. The pattern is:

1. **useEffect**: Run once on mount, fetch all tasks
2. **Subscribe**: Listen for real-time changes
3. **Cleanup**: Unsubscribe when component unmounts

This is the core pattern for any backend-connected React app.

### useEffect Dependency Array

```typescript
useEffect(() => {
  // This runs once on mount (empty dependency array)
}, [])
```

An empty dependency array means "run this effect once, on component mount."

### Fetching Data

```typescript
const { data, error } = await supabase
  .from('tasks')
  .select()

if (error) throw error
return data
```

### Converting Database to App Types

Database rows use snake_case (due_date, created_at). Your app uses camelCase. Convert when reading:

```typescript
const appTask: Task = {
  id: row.id,
  title: row.title,
  dueDate: row.due_date,  // snake_case → camelCase
  createdAt: row.created_at,
  status: row.status,
  priority: row.priority,
  description: row.description || undefined,
  assignee: row.assignee || undefined,
  precinct: row.precinct || undefined,
}
```

### Hint

1. **fetchTasks**:
   - Call `supabase.from('tasks').select()`
   - Convert database rows to app Task format
   - Set `loading` to false
   - Handle errors by setting state

2. **useEffect**:
   - Call `fetchTasks()` to load initial data
   - Set up a channel subscription (next challenge handles this)
   - Return a cleanup function that unsubscribes

### Starting Code

```typescript
const fetchTasks = async () => {
  ___________
}

useEffect(() => {
  ___________

  return () => {
    supabase.removeAllChannels()
  }
}, [])
```

### Reflection

1. **Why fetch on mount instead of in the component?** What's the advantage of a hook?
2. **What happens if you forget the cleanup function?** Will you leak memory?
3. **How would you add filtering (e.g., only tasks assigned to me)?** Where in the code?

---

## Challenge 4: Write — Mutations

**File:** `src/hooks/useTasks.ts` (continued)

**Concept:**

Mutations are write operations: INSERT, UPDATE, DELETE. Unlike reads (which can be paginated or filtered), mutations are targeted: "create this task," "update task #5," "delete task #3."

Each mutation is an async function that calls Supabase and handles errors.

### INSERT

```typescript
const { error } = await supabase
  .from('tasks')
  .insert([{ title, status, priority }])

if (error) throw error
```

### UPDATE

```typescript
const { error } = await supabase
  .from('tasks')
  .update({ status: 'complete' })
  .eq('id', taskId)

if (error) throw error
```

### DELETE

```typescript
const { error } = await supabase
  .from('tasks')
  .delete()
  .eq('id', taskId)

if (error) throw error
```

### Converting App to Database Types

When sending data to Supabase, convert camelCase to snake_case:

```typescript
const dbTask = {
  title: task.title,
  due_date: task.dueDate,  // camelCase → snake_case
  created_at: task.createdAt,
  // ...
}
```

### Hint

For `addTask`:
- Convert the task to database format
- Call `supabase.from('tasks').insert()`
- Throw error if it fails

For `updateTask`:
- Convert updates to database format
- Call `supabase.from('tasks').update(updates).eq('id', id)`
- Throw error if it fails

For `deleteTask`:
- Call `supabase.from('tasks').delete().eq('id', id)`
- Throw error if it fails

Note: In a real app, you'd call these from the component and handle errors there. For this exercise, let them throw—the component will catch them.

### Reflection

1. **Why convert between camelCase and snake_case?** Can't you use one naming style everywhere?
2. **What happens if you try to update a non-existent task?** Does Supabase error?
3. **How would you handle "optimistic updates"?** (Update UI before server responds)

---

## Challenge 5: Real-time Subscriptions

**File:** `src/hooks/useTasks.ts` (continued)

**Concept:**

Supabase can push changes to all connected clients in real-time using WebSockets. When another user updates a task, your app gets notified and can update the UI instantly.

The pattern is:
1. Create a channel
2. Listen for INSERT, UPDATE, DELETE events
3. Update local state when events arrive
4. Unsubscribe when the hook unmounts

This is what makes Supabase powerful: no polling, no manual refreshes. Just subscribe once and stay in sync.

### Subscription Pattern

```typescript
const channel = supabase
  .channel('tasks')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'tasks' },
    (payload) => {
      // payload.new, payload.old, payload.eventType
      if (payload.eventType === 'INSERT') {
        // Add task to state
      } else if (payload.eventType === 'UPDATE') {
        // Update task in state
      } else if (payload.eventType === 'DELETE') {
        // Remove task from state
      }
    }
  )
  .subscribe()
```

The `payload` object contains:
- `eventType`: 'INSERT', 'UPDATE', or 'DELETE'
- `new`: The new row (for INSERT and UPDATE)
- `old`: The old row (for UPDATE and DELETE)

### Hint

In the `useEffect`, after calling `fetchTasks()`:

1. Create a channel: `supabase.channel('tasks')`
2. Listen for all events: `.on('postgres_changes', { event: '*', ... }, callback)`
3. In the callback:
   - If INSERT: convert and add to state
   - If UPDATE: find and update the task
   - If DELETE: remove by id
4. Call `.subscribe()` to activate
5. In cleanup, call `supabase.removeAllChannels()`

### Starting Code

```typescript
useEffect(() => {
  fetchTasks()

  // TODO: Subscribe to real-time changes
  const channel = supabase
    .channel('tasks')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'tasks' },
      (payload) => {
        // TODO: Handle INSERT, UPDATE, DELETE events
        ___________
      }
    )
    .subscribe()

  return () => {
    supabase.removeAllChannels()
  }
}, [])
```

### Reflection

1. **Why is real-time better than polling?** What are the trade-offs?
2. **What happens if you delete the cleanup function?** (Hint: memory leak)
3. **How would you handle a network disconnection?** What state should you show?

---

## Full Solutions

### ✓ Challenge 1: Supabase Client Setup

```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Check .env.local')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
```

**Key points:**
- Environment variables must start with `VITE_` in Vite
- Always validate credentials exist before creating the client
- The `<Database>` type annotation gives you autocomplete and type safety

---

### ✓ Challenge 2: Database Types

The types are already provided. Study them to understand the structure.

**Key points:**
- `Row`: What comes back from SELECT
- `Insert`: What you provide to INSERT (with optional auto-generated fields)
- `Update`: What you provide to UPDATE (all fields optional)

---

### ✓ Challenge 3: Read — useTasks Hook

```typescript
const fetchTasks = async () => {
  try {
    setLoading(true)
    const { data, error } = await supabase.from('tasks').select()

    if (error) throw error

    const appTasks: Task[] = (data || []).map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description || undefined,
      status: row.status,
      priority: row.priority,
      assignee: row.assignee || undefined,
      precinct: row.precinct || undefined,
      dueDate: row.due_date || undefined,
      createdAt: row.created_at,
    }))

    setTasks(appTasks)
    setError(null)
  } catch (err) {
    setError(err instanceof Error ? err : new Error(String(err)))
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  fetchTasks()

  return () => {
    supabase.removeAllChannels()
  }
}, [])
```

**Key points:**
- Convert database rows to app format inside the fetch
- Use try/catch/finally to handle errors and loading state
- Call the cleanup function immediately to prepare for subscriptions

---

### ✓ Challenge 4: Write — Mutations

```typescript
const addTask = async (newTask: Omit<Task, 'id' | 'createdAt'>) => {
  const { error } = await supabase.from('tasks').insert([
    {
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      assignee: newTask.assignee,
      precinct: newTask.precinct,
      due_date: newTask.dueDate,
    },
  ])

  if (error) throw error
}

const updateTask = async (id: string, updates: Partial<Task>) => {
  const dbUpdates: any = {}
  if (updates.title) dbUpdates.title = updates.title
  if (updates.description !== undefined) dbUpdates.description = updates.description
  if (updates.status) dbUpdates.status = updates.status
  if (updates.priority) dbUpdates.priority = updates.priority
  if (updates.assignee !== undefined) dbUpdates.assignee = updates.assignee
  if (updates.precinct !== undefined) dbUpdates.precinct = updates.precinct
  if (updates.dueDate !== undefined) dbUpdates.due_date = updates.dueDate

  const { error } = await supabase.from('tasks').update(dbUpdates).eq('id', id)

  if (error) throw error
}

const deleteTask = async (id: string) => {
  const { error } = await supabase.from('tasks').delete().eq('id', id)

  if (error) throw error
}
```

**Key points:**
- Always convert camelCase to snake_case before sending to Supabase
- Use `.eq('id', id)` to target specific rows
- Throw errors so components can handle them

---

### ✓ Challenge 5: Real-time Subscriptions

```typescript
useEffect(() => {
  fetchTasks()

  const channel = supabase
    .channel('tasks')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'tasks' },
      (payload) => {
        const convertedTask: Task = {
          id: payload.new.id,
          title: payload.new.title,
          description: payload.new.description || undefined,
          status: payload.new.status,
          priority: payload.new.priority,
          assignee: payload.new.assignee || undefined,
          precinct: payload.new.precinct || undefined,
          dueDate: payload.new.due_date || undefined,
          createdAt: payload.new.created_at,
        }

        if (payload.eventType === 'INSERT') {
          setTasks((prev) => [...prev, convertedTask])
        } else if (payload.eventType === 'UPDATE') {
          setTasks((prev) => prev.map((t) => (t.id === convertedTask.id ? convertedTask : t)))
        } else if (payload.eventType === 'DELETE') {
          setTasks((prev) => prev.filter((t) => t.id !== payload.old.id))
        }
      }
    )
    .subscribe()

  return () => {
    supabase.removeAllChannels()
  }
}, [])
```

**Key points:**
- Convert database rows to app format in the callback
- Handle INSERT (add), UPDATE (replace), and DELETE (remove) separately
- The cleanup function must unsubscribe to prevent memory leaks

---

## Testing Your Work

To test the Supabase integration:

1. **Verify credentials**: Open DevTools → Console, type `import.meta.env.VITE_SUPABASE_URL`—you should see your URL
2. **Check the database**: Open Supabase Dashboard → Tasks table—tasks you create should appear there
3. **Test real-time**: Open the app in two browser tabs; create a task in one tab and watch it appear in the other
4. **Test mutations**: Update and delete tasks; watch the UI and database stay in sync

---

## What You've Learned

After completing all three modules, you understand:

✅ **Module 1**: React fundamentals (components, props, state, forms)
✅ **Module 2**: State management (custom hooks, filtering, sorting, async patterns)
✅ **Module 3**: Backend integration (Supabase, real-time subscriptions, CRUD)

---

## Next Steps

### Production Considerations

In a real app, you'd add:
- **Authentication**: Who's accessing the data? Supabase Auth handles this
- **Row Level Security (RLS)**: What can each user access? Supabase policies enforce this
- **Error boundaries**: What if a mutation fails? Show a snackbar or retry
- **Offline support**: What if the network goes down? Use local storage as a cache
- **Performance**: What if there are 10,000 tasks? Implement pagination

### Invicta Specific

For the actual Invicta app, you'd extend this with:
- Volunteer/organizer authentication
- Task assignment and notifications
- Precinct-based filtering and visibility
- Activity logs for transparency
- Bulk operations (e.g., "mark all tasks in Precinct 5 as complete")

---

## Interview Notes

In interviews, be prepared to discuss:

1. **Why Supabase over a custom backend?** (Realtime, RLS, fast iteration)
2. **How you'd handle offline users** (local state → sync when online)
3. **What `RLS` is and why it matters** (database-enforced security, not app-enforced)
4. **How you'd structure the schema for teams** (multi-tenancy, org-level tasks, role-based access)
5. **Real-time trade-offs** (faster updates vs. more server load; how to optimize)

Good luck! 🚀
