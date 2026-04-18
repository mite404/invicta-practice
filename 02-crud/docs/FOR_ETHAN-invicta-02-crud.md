# Ethan's Notes — Invicta Module 02: CRUD & State Management

---

## Concepts

### "Hooks" — What the word means across programming

**Non-React hooks** fall into a few categories:

| Type | Example | Purpose |
|------|---------|---------|
| Lifecycle hooks | Git `pre-commit`, Vue `mounted()` | Intercept a process or lifecycle moment |
| Event hooks | WordPress `add_action('save_post', fn)` | Fire your code when X happens in a system |
| Webhooks | Stripe POSTing to `/webhook` on payment | Notify your server of external events (HTTP callbacks) |
| **React custom hooks** | `useTaskManager` | Encapsulate and compose stateful logic for components to consume |

**Shared DNA:** "attach behavior without modifying the thing directly."

**Key distinction:** React hooks aren't about intercepting or reacting to events — they *own* state and logic that components borrow. `useTaskManager` doesn't fire when something happens; it *is* the task management system.

**Where React hooks do resemble event hooks:** `useMemo(() => {...}, [tasks, filterStatus])` literally only re-runs when its dependencies change — the dependency array is your qualifier.

---

### Sorting with `.sort()` — Three Patterns

`.sort()` is dumb by default — it sorts everything as strings, even numbers. To sort correctly, you pass it a comparator: a function that receives two items (`a` and `b`) and returns a number. Negative = `a` first, positive = `b` first, zero = equal.

---

#### `sortBy === 'created'` — Date strings need reconstruction

`createdAt` is stored as a plain string (`"2025-04-01T10:00:00Z"`). The `new Date()` used in `addTask` was thrown away immediately via `.toISOString()`. To do math on dates, you reconstruct a Date object and call `.getTime()` to get milliseconds.

```ts
result = [...result].sort((a, b) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
)
```

**Why `b - a`?** You want newest first. Newer dates have larger millisecond values. `b - a` makes the bigger number win (come first).

**Why `[...result]`?** `.sort()` mutates in place. Spreading first protects your state array from silent mutation, which would break React's immutability contract.

---

#### `sortBy === 'priority'` — Map strings to numbers first

`"high"`, `"medium"`, `"low"` are just strings — you can't subtract them. A lookup table translates them to numbers so `.sort()` can do math.

```ts
const priorityOrder = { high: 3, medium: 2, low: 1 }
result = [...result].sort((a, b) =>
  priorityOrder[b.priority] - priorityOrder[a.priority]
)
```

**Bracket notation:** `priorityOrder[b.priority]` — the *object* is the dictionary, the *string* is the key. `b.priority["high"]` would be backwards and invalid.

**Why `b - a` again?** High (3) should come first, so bigger wins again.

---

#### `sortBy === 'dueDate'` — Optional fields need explicit guards

`dueDate` is optional (`dueDate?: string`), so it might be `undefined`. Optional chaining (`?.`) silently returns `undefined` — `.sort()` needs a number, so that breaks it. Handle each missing case explicitly before comparing.

```ts
result = [...result].sort((a, b) => {
  if (!a.dueDate) return 1   // a missing → push to end
  if (!b.dueDate) return -1  // b missing → push to end
  return a.dueDate.localeCompare(b.dueDate)
})
```

**Why `.localeCompare()` instead of `.getTime()`?** ISO date strings (`YYYY-MM-DD`) were intentionally designed so alphabetical order equals chronological order. No reconstruction needed — string comparison works directly.

---

### Challenge 2 Reflections

**1. Why use `useMemo` instead of just filtering in render?**

`useMemo` caches the result of filtering and sorting. If `tasks`, `filterStatus`, and `sortBy` haven't changed, React uses the cached `filteredTasks` instead of recomputing. Without it, filtering runs on every render — even unrelated state changes (like a modal opening) would trigger a full re-filter of the entire task list.

**2. What happens if you forget `filterStatus` from the dependency array?**

The filter goes stale. `useMemo`'s callback closes over the value of `filterStatus` at the time it last ran. If `filterStatus` changes but isn't in the dep array, React doesn't know to recompute — so `filteredTasks` still reflects the *old* filter. The UI shows the wrong tasks with no error, no warning. Silent wrong data.

**3. How would you add a search filter (by task title)?**

Filtering and sorting are separate concerns — filtering narrows the list, sorting arranges it. A search filter uses `.filter()`, not `.sort()`:

```ts
result = result.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
```

`.sort()` without a comparator does alphabetical order by default — but that's a separate step, not a side effect of filtering. If you want both, chain them: filter first, then sort.

To wire it up: add a `searchTerm` state variable, add the filter step inside `useMemo`, and add `searchTerm` to the dependency array.

---
