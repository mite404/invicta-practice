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
