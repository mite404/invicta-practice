# Invicta 01-Components Learning Notes

## Challenge 1: TypeScript Types

### Types vs Enums

**Types describe shape; enums encode meaning.**

A `type` says "this is an object with these properties"—it's a blueprint. An `enum` says "this value must be one of these specific options"—it's a restricted set. 

In the tutorial example:
```typescript
type Priority = 'low' | 'medium' | 'high'  // union type: pick one of these string values
```

If this were an enum instead:
```typescript
enum Priority { Low, Medium, High }  // named group with actual enum values
```

**When to use each:**
- **Union types** (like `type Priority`) are simpler for small, literal option sets. They're readable, lightweight, and work great for your Task interface.
- **Enums** are useful for larger option sets or when you want JavaScript runtime values (enums compile to actual objects in the output).

The Task example wisely uses union types—they're the right tool for the job.

---

## Challenge 2: StatusBadge

### Pure Components & Config Mapping

A **pure component** always returns the same output for the same input—no side effects, no state mutations, completely deterministic.

StatusBadge demonstrates this pattern:
- Input: `status` prop (a TaskStatus)
- Internal: `statusConfig` mapping object (data → display config)
- Output: JSX badge with correct colors and label

The mapping object decouples data from presentation: if colors change, you update one object, not scattered JSX.

### Reflection Evaluation

**Answer 1 (Purity):** Correctly identified that StatusBadge has no side effects and is predictable. Refined: "deterministic" is the technical term—same input always produces same output, forever.

**Answer 2 (Testing):** Excellent instinct to use vitest + React Testing Library. Key insight: you can't test with invalid statuses like `'rejected'` because TypeScript prevents it. The real test is "for each valid status, does the component render the correct label and classes?" Type safety handles the contract; tests verify the output.

**Answer 3 (Config reuse):** Pragmatic thinking. Extract if identical, keep separate if similar-but-not-identical. Don't extract prematurely—wait until you see the pattern across files.

---

## Challenge 3: TaskCard (Composition)

### Composing Components & Conditional Rendering

TaskCard is a **composite component**—it uses StatusBadge as a sub-component and arranges task metadata around it. This teaches composition: building larger UIs from smaller, reusable pieces.

Key pattern: **conditional rendering** with `{field && <JSX />}`. This prevents crashes from rendering undefined values.

### Reflection Evaluation

**Answer 1 (Relationships):** Strong distinction between component relationship (composition) and data relationship (interface). Deepened: StatusBadge is *reusable* across contexts; Task is *project-specific* data. Flow: data type → display component → composite component.

**Answer 2 (Conditional Rendering):** Excellent defensive thinking. You went beyond "avoid crashes" to identify that optional fields can be `undefined` or falsy. TypeScript prevents *type* errors; runtime checks prevent *rendering* errors. Both needed.

**Answer 3 (Card Complexity):** Thinking like an architect. You identified **information hierarchy**: show what users *act on* (title, status, priority, due date); hide what supports the system (id, createdAt). This is core UX thinking—every field needs justification in the UI.

---

## Challenge 4: TaskList (List Rendering)

### The .map() Pattern & Keys

Lists in React use `.map()` to render a component for each item in an array. The critical detail is the `key` prop—React uses it to track which item is which across renders.

```javascript
{tasks.map((task) => (
  <TaskCard key={task.id} task={task} />
))}
```

- `key` must be **unique and stable** — never the array index
- `.map()` passes each item to the callback function
- Always check for empty arrays before rendering; show an empty state instead of blank space

### Reflection Evaluation

**Answer 1 (Key prop):** You correctly identified that `task.id` is stable metadata whereas array index changes with filtering/reordering. Refined: `task.id` is a **stable identifier** (never changes); index is **positional** (changes when array changes). React uses keys to track "which item is this?" across renders. Without stable keys, React can't reconcile properly—items might lose state or render incorrectly.

**Answer 2 (Empty state):** You thought philosophically: "verify assumptions before rendering." Exactly right. But the practical reason: an empty screen confuses users. An empty state message ("No tasks yet") tells the truth and guides them forward. Always choose clarity over silence.

**Answer 3 (Filtering):** You wrote `tasks.filter(task.priority === 'high')` — close, but syntax error. Correct syntax: `tasks.filter(task => task.priority === 'high')`. The arrow function `task =>` is the predicate—filter applies it to each item and keeps those where it returns true.

---

## Challenge 5: TaskForm (Controlled Components)

### Controlled Components & Form State

A **controlled component** means React owns the form value. Instead of the DOM storing the input's value, you store it in state and sync it bidirectionally:

```javascript
const [title, setTitle] = useState('')

<input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
```

- `value` syncs the input to state (state → input)
- `onChange` updates state when the user types (input → state)
- On submit, validate and call the callback, then reset state

### Form Submission Flow

1. User fills fields (state updates on each keystroke)
2. User clicks "Create Task"
3. `handleSubmit` fires:
   - Prevent default form submission (`e.preventDefault()`)
   - Validate (e.g., title is not empty)
   - Call `onSubmit` callback with form data
   - Reset state to clear the form

### Reflection Evaluation

**Answer 1 (Description handling):** Perfect. Optional fields in objects must be explicitly either the value or `undefined`—there's no "don't include it" option in an object literal. TypeScript forces you to be explicit: `{ description: undefined }` vs `{ description: "text" }`. You understood the constraint perfectly.

**Answer 2 (Controlled vs uncontrolled):** Close—let me refine. The `<input>` element is the same in both cases. The difference is **ownership**:
- **Controlled:** React owns the value (via state). You read from `value={title}` and update via `onChange`.
- **Uncontrolled:** The DOM owns the value. You read it later via a `ref` (a pointer to the element).

Controlled is idiomatic React; uncontrolled is for special cases (file uploads, legacy code integration).

**Answer 3 (Real-time validation):** You're thinking about conditional classes correctly. The full pattern:
```jsx
className={`... ${!title ? 'focus:ring-red-500' : 'focus:ring-indigo-500'} ...`}
```
Check the condition (`!title` = empty), apply red ring if true, indigo if false. You had the right idea—just needed the complete conditional class syntax.

`★ Insight ─────────────────────────────────────`
**Optional fields force explicitness.** You must choose: the value or `undefined`. No middle ground. **Controlled components let React own state.** React is the single source of truth for form data, not the DOM. **Conditional classes enable real-time feedback.** Template literals + ternaries = dynamic styling based on validation state.
`─────────────────────────────────────────────────`

---

## Key Principles

1. **Export controls API surface** — removing `export` from a type breaks type-safety in importing files and prevents the app from building
2. **Required properties are enforced** — TypeScript won't let you create a Task without providing `title`
3. **Types are compile-time only** — TypeScript erases types during compilation, but their absence during compilation breaks the build
4. **Pure components are testable** — determinism + type safety = predictable outputs, easy to test
5. **Composition is reusability** — StatusBadge works anywhere; TaskCard is context-specific
6. **Conditional rendering prevents errors** — TypeScript types catch *what*, runtime checks catch *if*

