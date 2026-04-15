/**
 * Supabase Auto-Generated Database Types
 *
 * In a real project, you'd generate these using:
 * `npx supabase gen types typescript --project-id YOUR_PROJECT_ID --db-url postgresql://... > types/database.ts`
 *
 * For this tutorial, we'll define the minimal types needed.
 */

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          status: 'todo' | 'in_progress' | 'complete' | 'blocked'
          priority: 'high' | 'medium' | 'low'
          assignee: string | null
          precinct: string | null
          due_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'complete' | 'blocked'
          priority?: 'high' | 'medium' | 'low'
          assignee?: string | null
          precinct?: string | null
          due_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'complete' | 'blocked'
          priority?: 'high' | 'medium' | 'low'
          assignee?: string | null
          precinct?: string | null
          due_date?: string | null
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

// App-level type matching our domain model
export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'complete' | 'blocked'
  priority: 'high' | 'medium' | 'low'
  assignee?: string
  precinct?: string
  dueDate?: string
  createdAt: string
}
