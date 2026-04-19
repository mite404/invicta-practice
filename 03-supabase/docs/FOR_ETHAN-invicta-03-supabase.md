# Invicta Practice — Module 03: Supabase

---

## Challenge 1: Supabase Client Setup — Reflections

### 1. Why does `VITE_` prefix matter?

**Your answer:** The env var needs the prefix because that's how the build environment is configured to expose vars to client code. Without it, the var would be inaccessible in the browser.

**Precision add:** Vite intentionally only bundles `VITE_`-prefixed variables into the client JS bundle — this is a *security boundary*. Non-prefixed vars remain server-side only (accessible in `vite.config.ts` and Node processes). This prevents accidentally leaking backend secrets into the browser.

---

### 2. Why throw an error instead of logging?

**Your answer:** The alternative is a `console.log`/`console.warn`, but throwing prevents a silent crash — the app stops immediately and you know exactly where to start debugging.

**Precision add:** This is the "fail fast" principle. Throwing at *initialization time* (when the client is being created) gives you a clear, root-cause error. A `console.warn` would let the app continue, and you'd get a cryptic error later — something like `Cannot read properties of undefined` deep inside a component, with no pointer back to the missing credentials.

---

### 3. Anon key vs. service role key

**Your answer:** The anon key is safe to make public. The service role key must stay secret because it's tied to RLS and prevents bad actors from accessing other users' data.

**Precision add:** The relationship to RLS is inverted from how you described it. The anon key *respects* RLS policies — it can only access what your policies explicitly allow. The service role key *bypasses RLS entirely*, meaning it can read and write every row in every table with no restrictions whatsoever. It's not that RLS protects users from the service key — it's that the service key skips RLS completely. That's why it must only live in server-side environments (API routes, Edge Functions) and never in browser code.

---

## Challenge 2: Database Types — Reflections

### 1. Why is only `title` required in `Insert`?

**Your answer:** `title` is the minimum required data to insert a task. Everything else is extra.

**Precision add:** Correct. The other fields are optional in `Insert` because they either have database defaults (`status: 'todo'`, `priority: 'medium'`), are auto-generated (`id`, `created_at`), or are genuinely nullable (`description`, `assignee`, etc.). A field is required in `Insert` only when it has no default and cannot be null.

---

### 2. Difference between `Row`, `Insert`, and `Update`?

**Your answer:** Update updates existing data, Row creates a new row, Insert you weren't sure about.

**Correction:** The definitions are:
- **`Row`** — the shape of data coming *back* from a SELECT query. All fields are present, none optional.
- **`Insert`** — what you *send* when creating a new record. Some fields optional because the DB provides defaults or generates them.
- **`Update`** — what you *send* to modify an existing record. *All* fields optional — you only include what you want to change.

The key insight: Row is output (read). Insert and Update are input (write). Insert vs. Update differ in which fields are required — Insert needs the minimum to create a valid record, Update needs nothing (you pick what to change).

---

### 3. Is validation a type job or a data job?

**Your answer:** Validation is a data job — checking whether actual data matches an expected type/shape.

**Precision add:** Correct. TypeScript's union types like `'high' | 'medium' | 'low'` catch mistakes at *compile time* (when you're writing code). But values from user input or external APIs arrive at *runtime* — TypeScript is gone by then. Runtime validation is a data job, typically handled by a library like Zod which checks actual values against a schema.

---
