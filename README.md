# invicta-practice

Interview prep for **Invicta Software Engineering internship** — a React/TypeScript/Supabase campaign task management system.

Three independent tutorial modules that teach core web development skills through
hands-on implementation. Work through the stubs, then reset and re-implement from scratch.

## Quick Start

Each module is independently runnable:

```bash
cd 01-components && bun install && bun dev
cd ../02-crud && bun install && bun dev
cd ../03-supabase && bun install && bun dev
```

## Modules

### 1️⃣ **Components** — React UI Fundamentals

Learn TypeScript types, component composition, and React fundamentals.

- **5 challenges**: Types → StatusBadge → TaskCard → TaskList → TaskForm
- **Progression**: Pure components → state management → form handling
- **Focus**: Props, composition, conditional rendering
- **Time estimate**: 45–60 minutes

[📖 Start here →](01-components/tutorial.md)

### 2️⃣ **CRUD Operations** — State Management & Hooks

Learn custom hooks, state management, and async patterns.

- **4 challenges**: useTaskManager → filtering → useAsyncTask → optimistic updates
- **Progression**: State coordination → derived state → async patterns → optimism
- **Focus**: Custom hooks, useMemo, try/catch, loading states
- **Time estimate**: 60–90 minutes

[📖 Start here →](02-crud/tutorial.md)

### 3️⃣ **Supabase Integration** — Backend & Real-time

Learn database operations, real-time subscriptions, and backend integration.

- **5 challenges**: Client setup → database types → read → write → real-time
- **Progression**: Client access → typed queries → data mutations → live updates
- **Focus**: Supabase client, RLS, useEffect cleanup, real-time subscriptions
- **Time estimate**: 90–120 minutes

[📖 Start here →](03-supabase/tutorial.md)

---

## Domain Context

Campaign task management for **Invicta** organizers and volunteers.
Realistic data shapes used across all modules:

```typescript
type TaskStatus = 'todo' | 'in_progress' | 'complete' | 'blocked'
type Priority = 'high' | 'medium' | 'low'

interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: Priority
  assignee?: string      // organizer/volunteer name
  precinct?: string      // geographic unit
  dueDate?: string       // ISO date string
  createdAt: string
}
```

---

## How to Use These Modules

### First Pass: Guided Implementation

1. Open the module's `tutorial.md`
2. Read the concept and hint for each challenge
3. Implement the stub file (stubs have `___________` blanks)
4. Check your work against the full solution at the end of the tutorial

### Reset & Re-implement

```bash
cd 01-components
git checkout src/  # Restore all stubs to blank state
bun dev            # Re-implement from scratch
```

### Study Mode

- Compare your implementation against the full solution in the tutorial
- Understand **why** certain patterns are used (see "Key points" in solutions)
- Adapt patterns to similar problems in other modules

---

## Learning Outcomes

After completing all three modules, you'll understand:

- ✅ **React fundamentals**: Components, props, composition, state, hooks
- ✅ **TypeScript**: Type safety, interfaces, generics, enums
- ✅ **Custom hooks**: State coordination, memoization, async patterns
- ✅ **Real-time databases**: Client setup, typed queries, subscriptions, RLS
- ✅ **Production patterns**: Loading states, error handling, optimistic updates

---

## Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL + real-time)
- **Package manager**: Bun

---

## Interview Context

This repo mirrors real Invicta engineering challenges:

- **Components**: Campaigns need customizable UI widgets that evolve with org needs
- **CRUD**: Task coordination requires reliable state management across volunteer teams
- **Real-time**: Organizers need to see task updates instantly as volunteers work

Design your code to be readable, resilient, and adaptable — the same standards you'll use on the job.

---

### Resetting stubs in a mono repo

**Commit as you complete each challenge**, not just at the end.

```bash
# Work through module 1
cd 01-components && bun dev

# After implementing Challenge 1
git add -A
git commit -m "Challenge 1: Implement StatusBadge component"

# After implementing Challenge 2
git add -A
git commit -m "Challenge 2: Implement TaskCard with composition"

# ... continue through all challenges ...

# When ready to redo from scratch (days/weeks later)
git checkout 01-components/src/  # Restore stubs to blank state

# Re-implement with fresh commits showing iteration
git add -A
git commit -m "Redo Module 1: Second pass - deeper understanding"
```
