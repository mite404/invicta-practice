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
