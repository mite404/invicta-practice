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

## Key Principles

1. **Export controls API surface** — removing `export` from a type breaks type-safety in importing files and prevents the app from building
2. **Required properties are enforced** — TypeScript won't let you create a Task without providing `title`
3. **Types are compile-time only** — TypeScript erases types during compilation, but their absence during compilation breaks the build

